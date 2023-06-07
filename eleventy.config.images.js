const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");

module.exports = eleventyConfig => {
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		return path.resolve(split.join(path.sep), relativeFilePath);
	}

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode("image", async function imageShortcode(src, alt, widths, className, styles) {
		// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
		// Warning: Avif can be resource-intensive so take care!
		let formats = ["avif", "webp", "auto"];
		let file = relativeToInputPath(this.page.inputPath, src);
		let metadata = await eleventyImage(file, {
			heights: [128],//widths || ["auto"],
			formats,
			outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
		});

		// TODO loading=eager and fetchpriority=high
		let imageAttributes = {
			alt,
			loading: "lazy",
			decoding: "async",
                        class: className || "",
                        style: styles || "",
		};
		return eleventyImage.generateHTML(metadata, imageAttributes);
	});
    // eleventyConfig.addShortcode("image", async function(src, alt, className, widths) {
		// if(alt === undefined) {
			// throw new Error(`Missing \`alt\` on image from: ${src}`);
		// }
    //             let file = relativeToInputPath(this.page.inputPath, src);

		// let metadata = await Image(file, {
			// widths: widths || ["auto"],
			// formats: ["webp"]
    //                     outputDir: path.join(eleventyConfig.dir.output, "img"),
		// });

		// let data = metadata.webp[metadata.jpeg.length - 1];

		// return `<img src="${data.url}" width="${data.width}" height="${data.height}" alt="${alt}" loading="lazy" decoding="async">`;
	// });

};


