async function t (params, reply) {
  const { sprintf } = this.plugin.app.bajo.lib
  const { get, isPlainObject } = this.plugin.app.bajo.lib._
  const { stringToObject, stringToArray } = this.plugin.app.bajoWebMpa
  let value = params.html.includes('%') ? stringToArray(params.attr.value) : stringToObject(params.attr.value)
  const i18n = get(reply, 'request.i18n')
  if (i18n) {
    const ns = get(reply.request, 'routeOptions.config.ns')
    if (isPlainObject(value)) params.html = i18n.t(params.html, value)
    else params.html = i18n.t(params.html, { ns, postProcess: 'sprintf', sprintf: value })
  } else {
    if (isPlainObject(value)) value = []
    params.html = sprintf(params.html, ...value)
  }
  params.noTag = true
}

export default t
