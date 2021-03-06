const path = require('path')
const { pathToFileURL } = require('url')
const pkg = require('./package.json')

const distURLBase = `https://raw.githubusercontent.com/Mad-Maddy/novelai-text-import/main/dist`
const packageName = 'NovelAI Text Importer'

const production = !process.env.ROLLUP_WATCH
const baseUrl = !production ? path.join(__dirname, 'build') : distURLBase

const filename = 'novelai-text-import.user.js'

let meta = {
  name: production ? packageName : packageName + ' -> dev',
  version: pkg.version,
  description: pkg.description,
  homepage: pkg.homepage,
  author: pkg.author,
  namespace: 'https://github.com/Mad-Maddy/novelai-text-import',
  resource: {
    css: production
      ? `${baseUrl}/bundle.css`
      : pathToFileURL(path.join(baseUrl, 'bundle.css')),
  },
  match: ['https://novelai.net/*'],
  grant: ['GM_addStyle', 'GM_getResourceText'],
  'run-at': 'document-idle',
}

if (!production) {
  meta.require = [pathToFileURL(path.join(baseUrl, filename))]
}

if (production) {
  meta.downloadURL = `${baseUrl}/${filename}`
  meta.updateURL = `${baseUrl}/${filename}`
}

module.exports = meta
