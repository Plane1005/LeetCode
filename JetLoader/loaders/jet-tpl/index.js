const { tplReplace, UppercaseObject, ReturnOld } = require("../utils.js");
const { getOptions } = require("loader-utils");

function JetLoader(source) {
  source = source.replace(/\s+/g, "");
  const { log, Uppercase } = getOptions(this);
  const _log = log
    ? `console.log('JetLoader is compiled ${this.resourcePath}')`
    : "";
  const _Uppercase = Uppercase ? `${UppercaseObject.toString()};UppercaseObject(options)` : `${ReturnOld.toString()};ReturnOld(options)`
  return `
        export default (options) => {
            ${tplReplace.toString()}
            ${_log.toString()}
            ${_Uppercase}
            return tplReplace('${source}', options);
        }
    `;
}

module.exports = JetLoader;
