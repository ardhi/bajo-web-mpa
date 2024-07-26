import Theme from './class/theme.js'
import Component from './class/component.js'

async function collectThemes (ctx) {
  const { eachPlugins, importModule } = this.app.bajo
  const { isEmpty, isFunction, omit } = this.app.bajo.lib._
  this.themes = []
  this.log.debug('Collect themes')
  const me = this
  await eachPlugins(async function ({ file, ns }) {
    let mod = await importModule(file)
    if (isFunction(mod)) mod = await mod.call(this, ctx)
    mod.css = mod.css ?? []
    mod.meta = mod.meta ?? []
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
