import { minify } from 'html-minifier-terser'
import * as prettier from 'prettier'
import * as emoji from 'node-emoji'
import path from 'path'

async function render (name, locals = {}, options = {}) {
  const { getConfig } = this.bajo.helper
  const { isEmpty } = this.bajo.helper._
  const cfg = getConfig('bajoWebMpa')
  const ext = isEmpty(name) ? '.njk' : path.extname(name)

  let content
  if (cfg.viewEngine !== '' && this[cfg.viewEngine]) content = await this[cfg.viewEngine].helper.render(name, locals, options)
  else content = await this.bajoWebMpa.viewEngine.render(name, locals)
  if (cfg.emoji && ['.njk', '.html'].includes(ext)) content = emoji.emojify(content)
  if (cfg.prettier.enabled && ['.njk', '.html'].includes(ext)) content = await prettier.format(content, cfg.prettier.options)
  if (cfg.minify.enabled && ['.njk', '.html', '.js', '.css'].includes(ext)) content = minify(content, cfg.minify.options)
  return content
}

export default render
