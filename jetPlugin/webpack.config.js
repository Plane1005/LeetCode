const { resolve } = require('path')
const MdToHtml = require('./plugins/md2html')

module.exports = {
    mode: 'development',
    entry: resolve(__dirname,'src/app.js'),
    output: {
        path: resolve(__dirname,'dist'),
        filename: 'app.js'
    },
    plugins: [
        new MdToHtml({
            template: resolve(__dirname,'test.md'),
            filename: 'test.html'
        })
    ]
}