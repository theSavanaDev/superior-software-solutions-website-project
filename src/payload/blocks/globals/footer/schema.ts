import { GlobalConfig } from "payload";

import { anyone } from "@/payload/access/anyone";

import { link } from "@/payload/fields/link/schema";

export const Footer: GlobalConfig = {
	slug: "footer",
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
			name: "description",
			label: "Site Description",
			type: "textarea",
			required: true,
			admin: {
				rows: 5,
				width: "50%",
			},
		},
		{
			name: "copyright",
			label: "Copyright Notice",
			type: "text",
			required: true,
			admin: {
				width: "50%",
			},
		},
		{
			name: "discoverNavigationLinks",
			label: "Discover Navigation Links",
			labels: {
				singular: "Discover Navigation Link",
				plural: "Discover Navigation Links",
			},
			type: "array",
			fields: [link({ appearances: false })],
			minRows: 1,
			maxRows: 5,
		},
		{
			name: "resourcesNavigationLinks",
			label: "Resources Navigation Links",
			labels: {
				singular: "Resources Navigation Link",
				plural: "Resources Navigation Links",
			},
			type: "array",
			fields: [link({ appearances: false })],
			minRows: 1,
			maxRows: 5,
		},
		{
			name: "legalNavigationLinks",
			label: "Legal Navigation Links",
			labels: {
				singular: "Legal Navigation Link",
				plural: "Legal Navigation Links",
			},
			type: "array",
			fields: [link({ appearances: false })],
			minRows: 1,
			maxRows: 5,
		},
	],
};
