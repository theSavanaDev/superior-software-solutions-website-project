import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticated-or-published";

import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
	slug: "posts",
	labels: {
		singular: "Post",
		plural: "Posts",
	},
	admin: {},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [],
	versions: {
		drafts: {
			autosave: {
				interval: 100, // set this interval for optimal live preview
			},
		},
		maxPerDoc: 50,
	},
};
