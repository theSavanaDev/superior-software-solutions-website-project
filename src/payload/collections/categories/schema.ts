import { anyone } from "@/payload/access/anyone";
import { authenticated } from "@/payload/access/authenticated";

import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	labels: {
		singular: "Category",
		plural: "Categories",
	},
	admin: {
		defaultColumns: ["title", "description", "createdAt", "updatedAt"],
		useAsTitle: "title",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated,
	},
	fields: [
		{
			name: "title",
			label: "Category Title",
			type: "text",
			required: true,
			admin: {
				width: "50%",
			},
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			admin: {
				rows: 5,
				width: "50%",
			},
		},
	],
};
