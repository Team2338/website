import yaml from "js-yaml";

export default async eleventyConfig => {
	eleventyConfig.addPassthroughCopy("src/static");
	eleventyConfig.addWatchTarget("src/sass");
	eleventyConfig.addTemplateFormats("njk");
	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

	eleventyConfig.browserSyncConfig = {
		https: true,
	};

	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};
