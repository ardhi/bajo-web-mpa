import * as emoji from 'node-emoji'

async function renderString (text, locals = {}, options = {}) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')

  let content
  if (cfg.viewEngine !== '' && this[cfg.viewEngine]) content = await this[cfg.viewEngine].helper.renderStrinng(text, locals, options)
  else content = await this.bajoWebMpa.viewEngine.renderString(text, locals)
  if (cfg.emoji) content = emoji.emojify(content)
  return content
}

export default renderString
