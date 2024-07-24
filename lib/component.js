class Component {
  constructor (plugin, $) {
    this.plugin = plugin
    this.$ = $
  }

  async buildTag (tag, params, reply) {
    const { camelCase } = this.plugin.app.bajo.lib._
    const theme = reply.request.theme ?? 'default'
    const method = camelCase(`${theme} ${tag}`)
    if (!this[method]) return false
    const result = await this[method](params, reply)
    return result ?? params
  }
}

export default Component
