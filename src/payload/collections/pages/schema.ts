import { slugField } from "@/payload/fields/slug/schema";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import type { CollectionConfig } from "payload";

const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

export const Pages: CollectionConfig = {
	slug: "pages",
	labels: {
		singular: "Page",
		plural: "Pages",
	},
	admin: {},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			name: "title",
			label: "Page Title",
			type: "text",
			required: true,
		},
		...slugField(),
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100, // set this interval for optimal live preview
			},
		},
		maxPerDoc: 50,
	},
};
