class Component {
  constructor (plugin, $) {
    this.plugin = plugin
    this.$ = $
  }

  buildTag (tag, params) {
    const { camelCase } = this.plugin.app.bajo.lib._
    const method = camelCase(tag)
    if (!this[method]) return false
    const result = this[method](params)
    return result ?? params
  }
}

export default Component
