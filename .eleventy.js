import yaml from "js-yaml";
import mdIt from "markdown-it";
import fs from "fs";
import path from "path";

export default async eleventyConfig => {
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addWatchTarget("src/sass");
    eleventyConfig.addTemplateFormats("njk");
    eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));
    
    eleventyConfig.setBrowserSyncConfig({
        https: true,
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync('public/404.html');
                    res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

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