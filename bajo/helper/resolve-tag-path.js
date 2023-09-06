import fs from 'fs'
import path from 'path'

const selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']

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
    const base = path.basename(item, path.extname(item))
    item = `${dir}/bajoWebMpa/tag/${selfClosing.includes(base) ? '_any-void.njk' : '_any.njk'}`
  }
  return item
}

export default resolveTagPath
