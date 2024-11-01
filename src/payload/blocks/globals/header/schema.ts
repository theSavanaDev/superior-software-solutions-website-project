import { GlobalConfig } from "payload";

import { anyone } from "@/payload/access/anyone";

import { link } from "@/payload/fields/link/schema";

export const Header: GlobalConfig = {
	slug: "header",
	access: {
		read: anyone,
	},
	fields: [
		{
			name: "logo",
			label: "Logo",
			type: "upload",
			relationTo: "media",
			required: true,
			admin: {
				width: "50%",
			},
		},
		{
			name: "title",
			label: "Site Title",
			type: "text",
			required: true,
			admin: {
				width: "50%",
			},
		},
		{
			name: "navigationLinks",
			label: "Navigation Links",
			labels: {
				singular: "Navigation Link",
				plural: "Navigation Links",
			},
			type: "array",
			fields: [link({ appearances: false })],
			minRows: 1,
			maxRows: 5,
		},
		{
			name: "ctaLink",
			label: "Call To Action Link",
			labels: {
				singular: "Call To Action Link",
				plural: "Call To Action Links",
			},
			type: "array",
			fields: [link({ appearances: false })],
			minRows: 1,
			maxRows: 1,
		},
	],
};
