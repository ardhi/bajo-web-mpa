import nunjucks from 'nunjucks'

const inBetween = (str, quote = '"') => {
  const matches = str.split(quote)
  return matches[1]
}

async function loader () {
  const { importPkg, resolveTplPath, getConfig } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const { find, cloneDeep, omit, each } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const { themes } = this.bajoWebMpa

  const Loader = nunjucks.Loader.extend({
    getSource: function (name) {
      const [ns, path, theme] = name.split(':')
      const themeDef = find(themes, { name: theme }) ?? {}
      const framework = themeDef.framework ?? 'default'
      const types = [`${theme}@${framework}`, framework, 'default']
      let file
      let check
      // check override
      each(types, type => {
        check = resolveTplPath(`app:${path}`, `bajoWebMpa/template/override/${ns}/${type}`, '.njk')
        if (fs.existsSync(check)) {
          file = check
          return false
        }
      })
      // check real template
      if (!file) {
        each(types, type => {
          check = resolveTplPath(`${ns}:${path}`, `bajoWebMpa/template/${type}`, '.njk')
          if (fs.existsSync(check)) {
            file = check
            return false
          }
        })
      }
      if (!file) file = check
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

  const opts = cloneDeep(omit(cfg.nunjucks, ['web', 'express']))
  const env = new nunjucks.Environment(new Loader(), opts)
  this.bajoWebMpa.viewEngine = env
}

export default loader
