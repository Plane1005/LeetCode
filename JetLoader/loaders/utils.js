function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    return replaceObject[key];
  });
}

function UppercaseObject(obj) {
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      let str = obj[key].toString();
      obj[key] = str.slice(0, 1).toUpperCase() + str.slice(1);
    }
  }
}

function ReturnOld(obj) {
  return obj;
}

module.exports = { tplReplace, UppercaseObject, ReturnOld };
