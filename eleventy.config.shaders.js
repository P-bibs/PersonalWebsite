const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const fs = require("fs");
const crypto = require("crypto");

module.exports = (eleventyConfig) => {
  function relativeToInputPath(inputPath, relativeFilePath) {
    let split = inputPath.split("/");
    split.pop();

    console.log(split.join(path.sep), relativeFilePath);

    return path.resolve(split.join(path.sep), relativeFilePath);
  }

  function relativeToServedPath(inputPath, relativeFilePath) {
    let split = inputPath.split("/");
    split.pop();
    split.shift();
    split[0] = "/";
    return path.join(split.join(path.sep), relativeFilePath);
  }

  eleventyConfig.addShortcode(
    "shader",
    async function (vertex_path, fragment_path, script) {
      console.log("====================================");
      console.log(this.page.inputPath);
      console.log("====================================");

      // let vertex_script = "";
      // let vertex_id = "";
      let vertex_url = "";
      if (vertex_path !== "") {
        // let file_path = relativeToInputPath(this.page.inputPath, vertex_path);
        // console.log(file_path);
        // let vertex_content = fs.readFileSync(file_path);
        // vertex_content = vertex_content.toString().trim();
        // vertex_id = `vertex-${crypto.randomUUID()}`;
        // vertex_script = `<script id="${vertex_id}" type="x-shader/x-vertex">${vertex_content}</script>`;
        vertex_url = relativeToServedPath(this.page.inputPath, vertex_path);
      }

      // let fragment = fs.readFileSync(relativeToInputPath(this.page.inputPath + "/../", fragment_path));
      // fragment = fragment.toString().trim();
      // let fragment_id = `fragment-${crypto.randomUUID()}`;
      // let fragment_script = `<div id="${fragment_id}" hidden type="x-shader/x-fragment" src="${relativeToServedPath(
      //   this.page.inputPath,
      //   fragment_path
      // )}"></script>`;

      let fragment_url = relativeToServedPath(this.page.inputPath, fragment_path);

      let canvas_id = `canvas-${crypto.randomUUID()}`;

      let url = (x) => x; //eleventyConfig.getFilter("url");

      let script_runner = `<script type="module">import main from "${url(script)}";main("${vertex_url}", "${fragment_url}", "${canvas_id}");</script>`;

      const output = [
        script_runner,
        `<div id="${canvas_id}" style="width: 100%; height: 100%"></div>`,
      ];

      return output.join("");
    }
  );
};
