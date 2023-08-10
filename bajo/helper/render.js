async function render (name, locals = {}, options = {}) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')

  if (cfg.viewEngine !== '' && this[cfg.viewEngine]) return await this[cfg.viewEngine].helper.render(name, locals, options)
  return await this.bajoWebMpa.viewEngine.render(name, locals)
}

export default render
