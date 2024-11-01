import { revalidatePath } from "next/cache";

import type { CollectionAfterChangeHook } from "payload";

import type { Service } from "@/payload-types";

export const revalidateService: CollectionAfterChangeHook<Service> = ({ doc, previousDoc, req: { payload } }) => {
	if (doc._status === "published") {
		const path = `/services/${doc.slug}`;

		payload.logger.info(`Revalidating serivice at ${path}...`);

		revalidatePath(path);
	}

	// if the service was previously published, we need to revalidate the old path
	if (previousDoc._status === "published" && doc._status !== "published") {
		const oldPath = `/services/${previousDoc.slug}`;

		payload.logger.info(`Revalidating old serivice at ${oldPath}...`);

		revalidatePath(oldPath);
	}

	return doc;
};
