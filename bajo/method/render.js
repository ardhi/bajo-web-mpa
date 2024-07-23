import path from 'path'

async function render (tplFile, params = {}, reply, opts = {}) {
  const ext = path.extname(tplFile)
  const ve = this.getViewEngine(ext)
  let text
  if (ve.render) text = await ve.render.call(this.app[ve.ns], tplFile, params, reply, opts)
  else text = await this.app[ve.ns].render(tplFile, params, reply, opts)
  if (ext === '.md') opts.markdown = true
  return await this.applyFormat(text, ve, ext, opts)
}

export default render
