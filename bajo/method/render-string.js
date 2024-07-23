async function renderString (text, params = {}, opts = {}) {
  const ve = this.getViewEngine(opts.ext)
  if (ve.renderString) text = await ve.renderString.call(this.app[ve.ns], text, params, opts)
  else text = await this.app[ve.ns].renderString(text, params, opts)
  return await this.applyFormat(text, ve, opts.ext, opts)
}

export default renderString
