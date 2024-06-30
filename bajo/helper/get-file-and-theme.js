import _path from 'path'

function getFileAndTheme (name) {
  const { resolveTplPath, log, getConfig, fs } = this.bajo.helper
  const { resolveComponentPath } = this.bajoWebMpa.helper
  const { each, find, isEmpty } = this.bajo.helper._
  const { themes } = this.bajoWebMpa
  const cfg = getConfig('bajoWebMpa')
  const parts = name.split(':')
  const theme = parts.pop()
  if (_path.isAbsolute(parts[0])) return { file: parts[0], theme }
  let [ns, path] = name.split(':')
  if (isEmpty(_path.extname(path))) path += '.njk'
  const themeDef = find(themes, { name: theme }) ?? {}
  if (ns === 'cmp') {
    const file = resolveComponentPath(path, themeDef)
    return { file, theme }
  }
  const framework = themeDef.framework ?? 'default'
  const types = [`${theme}@${framework}`, framework, 'default']
  let file
  let check
  // check override
  each(types, type => {
    check = resolveTplPath(`app:${path}`, `bajoWebMpa/template/override/${ns}/${type}`)
    if (fs.existsSync(check)) {
      file = check
      return false
    } else {
      if (cfg.traceNoTemplate) log.trace('Can\'t find template override: %s (%s)', check, name)
    }
  })
  // check real template
  if (!file) {
    each(types, type => {
      check = resolveTplPath(`${ns}:${path}`, `bajoWebMpa/template/${type}`)
      if (fs.existsSync(check)) {
        file = check
        return false
      } else {
        if (cfg.traceNoTemplate) log.trace('Can\'t find real template: %s (%s)', check, name)
      }
    })
  }
  // check real template from theme
  if (!file) {
    each(types, type => {
      check = resolveTplPath(`${themeDef.plugin}:${path}`, `bajoWebMpa/template/${type}`)
      if (fs.existsSync(check)) {
        file = check
        return false
      } else {
        if (cfg.traceNoTemplate) log.trace('Can\'t find theme\'s template: %s (%s)', check, name)
      }
    })
  }
  if (!file) file = check
  return { file, theme }
}

export default getFileAndTheme
