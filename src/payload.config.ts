import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import {
	BoldFeature,
	FixedToolbarFeature,
	HeadingFeature,
	ItalicFeature,
	LinkFeature,
	UnderlineFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";
import { buildConfig } from "payload";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Categories } from "@/payload/collections/categories/schema";
import { Media } from "@/payload/collections/media/schema";
import { Users } from "@/payload/collections/users/schema";
import { Pages } from "@/payload/collections/pages/schema";
import { Posts } from "@/payload/collections/posts/schema";
import { Services } from "@/payload/collections/services/schema";

import { Header } from "@/payload/blocks/globals/header/schema";
import { Footer } from "@/payload/blocks/globals/footer/schema";

import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page, Post, Service } from "@/payload-types";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const databaseURI = process.env.NODE_ENV === "development" ? process.env.DATABASE_URI_DEV! : process.env.DATABASE_URI_PRD!;
const payloadSecret = process.env.PAYLOAD_SECRET!;
const resendAPIKey = process.env.RESEND_API_KEY!;
const uploadthingSecret = process.env.UPLOADTHING_SECRET!;
const publicURL = process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_SERVER_URL_DEV! : process.env.NEXT_PUBLIC_SERVER_URL_PRD!;

const generateTitle: GenerateTitle<Page | Post | Service> = ({ doc }) => {
	return doc?.title ? `${doc.title} | Superior Software Solutions` : "Superior Software Solutions";
};

const generateURL: GenerateURL<Page | Post | Service> = ({ doc }) => {
	return doc?.slug ? `${publicURL}/${doc.slug}` : publicURL;
};

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667,
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024,
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900,
				},
			],
		},
		user: Users.slug,
	},
	collections: [Pages, Posts, Services, Categories, Media, Users],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexicalEditor({
		features: () => {
			return [
				BoldFeature(),
				ItalicFeature(),
				LinkFeature({
					enabledCollections: ["pages", "posts", "services"],
					fields: ({ defaultFields }) => {
						const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
							if ("name" in field && field.name === "url") return false;
							return true;
						});

						return [
							...defaultFieldsWithoutUrl,
							{
								name: "url",
								type: "text",
								admin: {
									condition: ({ linkType }) => linkType !== "internal",
								},
								label: ({ t }) => t("fields:enterURL"),
								required: true,
							},
						];
					},
				}),
				UnderlineFeature(),
			];
		},
	}),
	email: resendAdapter({
		defaultFromAddress: "hello@s3.co.ke",
		defaultFromName: "Mailer @ S3",
		apiKey: resendAPIKey,
	}),
	globals: [Header, Footer],
	plugins: [
		formBuilderPlugin({
			fields: {
				payment: false,
			},
			formOverrides: {
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("name" in field && field.name === "confirmationMessage") {
							return {
								...field,
								editor: lexicalEditor({
									features: ({ rootFeatures }) => {
										return [...rootFeatures, FixedToolbarFeature(), HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] })];
									},
								}),
							};
						}
						return field;
					});
				},
			},
		}),
		seoPlugin({ generateTitle, generateURL }),
		uploadthingStorage({
			collections: {
				[Media.slug]: true,
			},
			options: {
				apiKey: uploadthingSecret,
				acl: "public-read",
			},
		}),
	],
	secret: payloadSecret,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
