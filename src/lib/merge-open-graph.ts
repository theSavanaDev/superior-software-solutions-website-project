import type { Metadata } from "next";

const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	description:
		"Small business? Get powerful websites, emails, and apps to unleash your brand story. Focus on what you love, we'll handle the web.",
	images: [
		{
			url: publicURL ? `${publicURL}/superior-software-solutions-og.webp` : "/superior-software-solutions-og.webp",
		},
	],
	siteName: "Superior Software Solutions",
	title: "Superior Software Solutions",
};

export const mergeOpenGraph = (og?: Metadata["openGraph"]): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
