async function theme () {
  const { importPkg, eachPlugins, readConfig, log } = this.bajo.helper
  const { each, isPlainObject, isString, find, pullAt, map, filter, clone, concat, isArray, merge } = await importPkg('lodash-es')
  const all = []
  await eachPlugins(async function ({ file, plugin }) {
    let mods = await readConfig(file, { defValue: [] })
    if (isPlainObject(mods)) mods = [mods]
    each(mods, m => {
      m.framework = m.framework ?? m.name
      m.plugin = plugin
      if (isString(m.css)) m.css = [m.css]
      if (isString(m.script)) m.script = [m.script]
      all.push(m)
    })
  }, { glob: 'theme/index.*' })
  // dropped if no framework installed
  const deleted = []
  each(all, (a, i) => {
    if (!find(all, { name: a.framework })) deleted.push([i, a.name])
  })
  if (deleted.length > 0) {
    pullAt(all, map(deleted, d => d[0]))
    log.warn('No matching framework found for these themes, skipped: %s', map(deleted, d => d[1]).join(', '))
  }
  // merge script/css
  const items = filter(all, a => a.name !== a.framework)
  each(items, (item, i) => {
    const framework = find(all, { name: item.framework })
    item.useFramework = item.useFramework ?? []
    each(['script', 'css', 'icon', 'mapping'], type => {
      if (item.useFramework.includes(type)) {
        if (isArray(framework[type])) item[type] = concat(clone(framework[type] ?? []), clone(item[type] ?? []))
        else if (isPlainObject(framework[type])) item[type] = merge({}, item[type], framework[type])
      }
    })
    delete item.useFramework
    items[i] = item
  })
  // TODO: check the uniqness of names & frameworks
  log.debug('%d theme(s) loaded: %s', all.length, map(all, a => a.name).join(', '))
  this.bajoWebMpa.themes = all
}

export default theme
