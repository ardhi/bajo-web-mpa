import path from 'path'

async function render (tplFile, params = {}, reply, opts = {}) {
  const ext = path.extname(tplFile)
  const ve = this.getViewEngine(ext)
  const text = await ve.render(tplFile, params, reply, opts)
  if (ext === '.md') opts.markdown = true
  return await this.applyFormat(text, ve, ext, opts)
}

export default render
