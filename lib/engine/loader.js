import nunjucks from 'nunjucks'
import _path from 'path'
import fs from 'fs'

let _ = {}

const inBetween = (str, quote = '"') => {
  const matches = str.split(quote)
  return matches[1]
}

function getFileAndTheme (name) {
  const { resolveTplPath } = this.bajo.helper
  const { resolveTagPath } = this.bajoWebMpa.helper
  const { themes } = this.bajoWebMpa
  const parts = name.split(':')
  const theme = parts.pop()
  if (_path.isAbsolute(parts[0])) return { file: parts[0], theme }
  const [ns, path] = name.split(':')
  const themeDef = _.find(themes, { name: theme }) ?? {}
  if (ns === 'tag') {
    const file = resolveTagPath(path, themeDef)
    return { file, theme }
  }
  const framework = themeDef.framework ?? 'default'
  const types = [`${theme}@${framework}`, framework, 'default']
  let file
  let check
  // check override
  _.each(types, type => {
    check = resolveTplPath(`app:${path}`, `bajoWebMpa/template/override/${ns}/${type}`, '.njk')
    if (fs.existsSync(check)) {
      file = check
      return false
    }
  })
  // check real template
  if (!file) {
    _.each(types, type => {
      check = resolveTplPath(`${ns}:${path}`, `bajoWebMpa/template/${type}`, '.njk')
      if (fs.existsSync(check)) {
        file = check
        return false
      }
    })
  }
  if (!file) file = check
  return { file, theme }
}

async function loader () {
  const { importPkg, getConfig } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const { find, cloneDeep, omit, each } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWebMpa')
  const me = this

  _ = { find, each }

  const Loader = nunjucks.Loader.extend({
    getSource: function (name) {
      const { file, theme } = getFileAndTheme.call(me, name)
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
  opts.autoescape = false
  const env = new nunjucks.Environment(new Loader(), opts)
  env.runtime = nunjucks.runtime
  this.bajoWebMpa.viewEngine = env
}

export default loader
