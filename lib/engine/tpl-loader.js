import nunjucks from 'nunjucks'

const inBetween = (str, quote = '"') => {
  const matches = str.split(quote)
  return matches[1]
}

async function tplLoader () {
  const { importPkg, resolveTplPath, getConfig } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const cfg = getConfig('bajoWebMpa')

  const Loader = nunjucks.Loader.extend({
    getSource: function (name) {
      let [ns, path, theme] = name.split(':')
      if (!theme) theme = 'default'
      let file = resolveTplPath(`${ns}:${path}`, `bajoWebMpa/template/${theme}`, '.njk')
      if (theme !== 'default' && !fs.existsSync(file)) {
        file = resolveTplPath(`${ns}:${path}`, 'bajoWebMpa/template/default', '.njk')
      }
      let source = fs.readFileSync(file, 'utf8')
      const sources = source.split('\n')
      const tags = ['{% extends', '{% include', '{% import', '{%extends', '{%include', '{%import']
      for (const i in sources) {
        const s = sources[i]
        let found = false
        for (const t of tags) {
          if (s.includes(t)) found = true
        }
        if (!found) continue
        let link = inBetween(s)
        if (!link) link = inBetween(s, "'")
        if (!link) continue
        sources[i] = s.replace(link, link + ':' + theme)
      }
      source = sources.join('\n')
      return { src: source, path: file, noCache: cfg.nunjucks.noCache }
    }
  })

  return Loader
}

export default tplLoader
