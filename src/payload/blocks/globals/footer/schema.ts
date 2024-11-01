import { GlobalConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { link } from "@/payload/fields/link/schema";

export const Footer: GlobalConfig = {
	slug: "footer",
	access: {
		read: anyone,
	},
	fields: [],
};
