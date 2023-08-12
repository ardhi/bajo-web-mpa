import { minify } from 'html-minifier-terser'

async function render (name, locals = {}, options = {}) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')

  let content
  if (cfg.viewEngine !== '' && this[cfg.viewEngine]) content = await this[cfg.viewEngine].helper.render(name, locals, options)
  else content = await this.bajoWebMpa.viewEngine.render(name, locals)
  if (!cfg.minify.enabled) return content
  return minify(content, cfg.minify.options)
}

export default render
