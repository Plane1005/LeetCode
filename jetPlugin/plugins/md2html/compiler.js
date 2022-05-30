const { randomNum } = require('./utils.js')

const reg_mark = /^(.+?)\s/
const reg_sharp = /^\#/
const reg_crossbar = /^\-/
const reg_number = /^\d/

function createTree(_mdArr) {
	let _htmlPool = {}
  let _lastMark = ' '
  let _randomKey = 0
	_mdArr.forEach((mdFragment) => {
		const matched = mdFragment.match(reg_mark)
		if (matched) {
			const mark = matched[1]
			const input = matched['input']
			if (reg_sharp.test(mark)) {
				const tag = `h${mark.length}`
				const tagWithKey = tag + '-' + randomNum()
				const tagContent = input.replace(reg_mark, '')
				if (_lastMark === mark) {
					_htmlPool[tagWithKey].tags = [
						..._htmlPool[tagWithKey].tags,
						`<${tag}>${tagContent}</${tag}>`,
					]
				} else {
					_lastMark = mark
					_htmlPool[tag] = {
						type: 'single',
						tags: [`<${tag}>${tagContent}</${tag}>`],
					}
				}
      }
      if (reg_crossbar.test(mark)) {
        const tagContent = input.replace(reg_mark, '')
        const tag = `li`
        if (_lastMark === mark) {
          _htmlPool[_randomKey].tags = [
						..._htmlPool[_randomKey].tags,
						`<${tag}>${tagContent}</${tag}>`,
					]
        } else {
          _lastMark = mark
          _randomKey = 'ul-' + randomNum()
          _htmlPool[_randomKey] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
      if (reg_number.test(mark)) {
        const tagContent = input.replace(reg_mark, '')
        const tag = `li`
        if (reg_number.test(_lastMark)) {
          _htmlPool[_randomKey].tags = [
						..._htmlPool[_randomKey].tags,
						`<${tag}>${tagContent}</${tag}>`,
					]
        } else {
          _lastMark = parseInt(mark)
          _randomKey = 'ol-' + randomNum()
          _htmlPool[_randomKey] = {
            type: 'wrap',
            tags: [`<${tag}>${tagContent}</${tag}>`]
          }
        }
      }
		}
	})
	return _htmlPool
}

function compileHTML(_mdArr) {
  const _htmlPool = createTree(_mdArr)
  let _htmlStr = ''
  let item
  for (let k in _htmlPool) {
    item = _htmlPool[k]
    if (item.type === 'single') {
      item.tags.forEach((tag) => {
        _htmlStr += tag
      })
    } else {
      let _list = `<${k.split('-')[0]}>`
      item.tags.forEach((tag) => {
        _list += tag
      })
      _list += `</${k.split('-')[0]}>`
      _htmlStr += _list
    }
  }
  console.log(_htmlStr);
  return _htmlStr
}

module.exports = {
	compileHTML,
}
