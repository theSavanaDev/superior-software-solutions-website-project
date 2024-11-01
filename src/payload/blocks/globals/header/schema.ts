import { GlobalConfig } from "payload";

import { anyone } from "@/payload/access/anyone";
import { link } from "@/payload/fields/link/schema";

export const Header: GlobalConfig = {
	slug: "header",
	access: {
		read: anyone,
	},
	fields: [],
};
