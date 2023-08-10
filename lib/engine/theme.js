async function theme () {
  const { importPkg, eachPlugins, readConfig } = this.bajo.helper
  const { each, isPlainObject, isString } = await importPkg('lodash-es')
  const all = []
  await eachPlugins(async function ({ file, plugin }) {
    let mods = await readConfig(file, { defValue: [] })
    if (isPlainObject(mods)) mods = [mods]
    each(mods, m => {
      m.plugin = plugin
      if (isString(m.css)) m.css = [m.css]
      if (isString(m.script)) m.script = [m.script]
      all.push(m)
    })
  }, { glob: 'themes.js' })
  this.bajoWebMpa.themes = all
}

export default theme
