async function theme () {
  const { importPkg, eachPlugins, readConfig, log } = this.bajo.helper
  const { each, isPlainObject, isString, find, pullAt, map, filter, clone, concat } = await importPkg('lodash-es')
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
  }, { glob: 'themes.*' })
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
    each(['script', 'css'], type => {
      if (item[`${type}Merge`]) {
        items[i][type] = concat(clone(framework[type]), clone(item[type]))
        delete items[i][`${type}Merge`]
      }
    })
  })
  // TODO: check the uniqness of names & frameworks
  log.debug('%d theme(s) loaded: %s', all.length, map(all, a => a.name).join(', '))
  this.bajoWebMpa.themes = all
}

export default theme
