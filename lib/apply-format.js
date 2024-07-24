import { minify } from 'html-minifier-terser'
import * as prettier from 'prettier'
import * as emoji from 'node-emoji'

async function applyFormat ({ text, viewEngine, ext, reply, opts = {} } = {}) {
  const { get } = this.app.bajo.lib._
  const exts = ['.html', ...viewEngine.fileExts]

  const parseMd = get(this, 'app.bajoMarkdown.parse')
  if (parseMd && (exts.includes('.md') || opts.markdown)) text = parseMd(text)
  if (this.config.emoji && exts.includes(ext)) text = emoji.emojify(text)
  if (exts.includes(ext)) text = await this.parseComponents(text, viewEngine, reply)
  if (this.config.prettier && exts.includes(ext)) text = await prettier.format(text, this.config.prettier)
  if (this.config.minify && ['.js', '.css', ...exts].includes(ext)) text = minify(text, this.config.minify)
  return text
}

export default applyFormat
