import path from 'path'
import { minify } from 'html-minifier-terser'
import * as prettier from 'prettier'
import * as emoji from 'node-emoji'

async function render (name, params, reply) {
  const { find } = this.app.bajo.lib._
  const ext = path.extname(name)
  const viewEngine = find(this.viewEngines, ve => ve.fileExts.includes(ext))
  if (!viewEngine) throw this.error('No view engine available')
  let content = await this.app[viewEngine.ns].render(name, params, reply)
  const exts = ['.html', ...viewEngine.fileExts]
  if (this.config.emoji && exts.includes(ext)) content = emoji.emojify(content)
  if (this.config.prettier.enabled && exts.includes(ext)) content = await prettier.format(content, this.config.prettier.options)
  if (this.config.minify.enabled && ['.js', '.css', ...exts].includes(ext)) content = minify(content, this.config.minify.options)
  return content
}

export default render
