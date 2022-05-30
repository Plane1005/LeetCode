const { readFileSync } = require("fs");
const { resolve } = require("path");
const { compileHTML } = require("./compiler.js");

const INNER_MARK = "<!-- inner -->";

class MdToHtml {
  constructor({ template, filename }) {
    if (!template) throw new Error("Missing template");
    this.template = template;
    this.filename = filename || "md.html";
  }

  apply(compiler) {
    compiler.hooks.emit.tap("md2html", (compilation) => {
      const _assets = compilation.assets;
      const _mdContent = readFileSync(this.template, "utf8");
      const _mdContentArr = _mdContent.split("\n");
      const _htmlContent = readFileSync(
        resolve(__dirname, "template.html"),
        "utf8"
      );
      const _htmlStr = compileHTML(_mdContentArr);
      const finalHTML = _htmlContent.replace(INNER_MARK, _htmlStr);
      _assets[this.filename] = {
        source() {
          return finalHTML;
        },
        size() {
          return finalHTML.length;
        },
      };
    });
  }
}

module.exports = MdToHtml;
