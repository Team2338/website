import yaml from "js-yaml";
import mdIt from "markdown-it";

export default async eleventyConfig => {
	eleventyConfig.addPassthroughCopy("src/static");
	eleventyConfig.addWatchTarget("src/sass");
	eleventyConfig.addTemplateFormats("njk");
	eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

	eleventyConfig.browserSyncConfig = {
		https: true,
	};

	const md = new mdIt({
		html: true,
	});

	eleventyConfig.addFilter("md", content => {
		return md.render(content);
	});

	return {
		dir: {
			input: "src",
			output: "public",
		},
	};
};
