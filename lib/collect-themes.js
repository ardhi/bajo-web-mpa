import Theme from './class/theme.js'
import Component from './class/component.js'

async function collectThemes (ctx) {
  const { eachPlugins, importModule, breakNsPath, readConfig } = this.app.bajo
  const { isEmpty, isFunction, omit, isArray } = this.app.bajo.lib._
  const { routePath } = this.app.bajoWebStatic

  this.themes = []
  this.log.debug('Collect themes')
  const me = this
  await eachPlugins(async function ({ file, ns }) {
    let mod = await importModule(file)
    if (isFunction(mod)) mod = await mod.call(this, ctx)
    mod.meta = mod.meta ?? []
    mod.css = mod.css ?? []
    const css = []
    const extCss = []
    for (const i in mod.css) {
      if (mod.css[i].startsWith('/')) css.push(mod.css[i])
      else {
        const [ns, path, subNs] = breakNsPath(mod.css[i])
        if (subNs === 'load') extCss.push({ ns, path })
        else css.push(routePath(mod.css[i]))
      }
    }
    for (const c of extCss) {
      let mod = await readConfig(`${c.ns}:${c.path}`)
      if (!isArray(mod)) mod = [mod]
      for (const m of mod) {
        css.push(m.startsWith('/') ? m : routePath(m))
      }
    }
    mod.css = css
    const theme = new Theme(this, mod.name)
    Object.assign(theme, omit(mod, ['name']))
    const plugin = this
    theme.createComponent = function ($) {
      const cmp = new Component(plugin, $, theme)
      if (!isEmpty(mod.component)) Object.assign(cmp, mod.component)
      return cmp
    }
    me.themes.push(theme)
    me.log.trace('- %s@%s', theme.name, ns)
  }, { glob: 'theme.js', baseNs: this.name })
}

export default collectThemes
