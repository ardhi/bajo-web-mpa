import { minify } from 'html-minifier-terser'
import * as prettier from 'prettier'
import * as emoji from 'node-emoji'

async function render (name, locals = {}, options = {}) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')

  let content
  if (cfg.viewEngine !== '' && this[cfg.viewEngine]) content = await this[cfg.viewEngine].helper.render(name, locals, options)
  else content = await this.bajoWebMpa.viewEngine.render(name, locals)
  if (cfg.emoji) content = emoji.emojify(content)
  if (cfg.prettier.enabled) content = await prettier.format(content, cfg.prettier.options)
  if (cfg.minify.enabled) content = minify(content, cfg.minify.options)
  return content
}

export default render
