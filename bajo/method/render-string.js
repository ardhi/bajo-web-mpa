import * as emoji from 'node-emoji'

async function render (text, params = {}, { parseMarkdown = true } = {}) {
  const { find } = this.app.bajo.lib._
  const viewEngine = find(this.viewEngines, ve => ve.name)
  if (!viewEngine) throw this.error('No view engine available')
  let content = text
  if (parseMarkdown && this.app.bajoMarkdown) content = this.app.bajoMarkdown.parse(content)
  content = await this.app[viewEngine.ns].renderString(text, params)
  if (this.config.emoji.enabled) content = emoji.emojify(content)
  return content
}

export default render
