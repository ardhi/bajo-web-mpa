import fs from 'fs'

function resolveTagPath (name, theme, useCustom) {
  const { getConfig } = this.bajo.helper
  let dir = getConfig(theme.plugin, { full: true }).dir
  let item = `${dir}/bajoWebMpa/tag/${theme.name}/${name}.njk`
  if (!fs.existsSync(item)) { // is it in theme?
    const t = this.bajoWebMpa.themes.find(i => i.name === theme.framework)
    if (t) {
      dir = getConfig(t.plugin, { full: true }).dir
      item = `${dir}/bajoWebMpa/tag/${t.name}/${name}.njk`
    }
  }
  if (!fs.existsSync(item)) { // is it in framework?
    dir = getConfig('bajoWebMpa', { full: true }).dir
    item = `${dir}/bajoWebMpa/tag/${name}.njk`
  }
  if (!fs.existsSync(item)) {
    if (!useCustom) return
    item = `${dir}/bajoWebMpa/tag/_custom.njk`
  }
  return item
}

export default resolveTagPath
