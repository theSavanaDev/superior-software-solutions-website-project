import { MetaDescriptionField, MetaImageField, MetaTitleField, OverviewField, PreviewField } from "@payloadcms/plugin-seo/fields";

import { generatePreviewPath } from "@/lib/generate-preview-path";

import { slugField } from "@/payload/fields/slug/schema";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import { populateAuthors } from "@/payload/collections/posts/hooks/populate-authors";
import { revalidatePost } from "@/payload/collections/posts/hooks/revalidate-post";

import type { CollectionConfig } from "payload";

const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

export const Posts: CollectionConfig = {
	slug: "posts",
	labels: {
		singular: "Post",
		plural: "Posts",
	},
	admin: {
		defaultColumns: ["title", "slug", "createdAt", "updatedAt"],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "pages",
				});

				return `${publicURL}${path}`;
			},
		},
		preview: (data) => {
			const path = generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "pages",
			});

			return `${publicURL}${path}`;
		},
		useAsTitle: "title",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			name: "title",
			label: "Post Title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [],
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),
						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		...slugField(),
	],
	hooks: {
		afterRead: [populateAuthors],
		afterChange: [revalidatePost],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // set this interval for optimal live preview
			},
		},
		maxPerDoc: 50,
	},
};
