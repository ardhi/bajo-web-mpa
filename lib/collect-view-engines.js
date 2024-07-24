import ViewEngine from './view-engine.js'
import Component from './component.js'

async function collectViewEngines (ctx) {
  const { eachPlugins, importModule, join } = this.app.bajo
  const { isEmpty, isFunction } = this.app.bajo.lib._
  this.viewEngines = []
  this.log.debug('Collect view engines')
  const me = this
  await eachPlugins(async function ({ file, ns }) {
    let mod = await importModule(file)
    if (isFunction(mod)) mod = await mod.call(this, ctx)
    const ve = new ViewEngine(this, mod.name, mod.fileExts)
    const plugin = this
    ve.createComponent = function ($) {
      const cmp = new Component(plugin, $)
      if (!isEmpty(mod.component)) Object.assign(cmp, mod.component)
      return cmp
    }
    me.viewEngines.push(ve)
    me.log.trace('- %s@%s (%s)', ve.name, ns, join(ve.fileExts))
  }, { glob: 'view.js', baseNs: this.name })
}

export default collectViewEngines
