async function renderString (text, params = {}, opts = {}) {
  const ve = this.getViewEngine(opts.ext)
  text = await ve.renderString(text, params, opts)
  return await this.applyFormat(text, ve, opts.ext, opts)
}

export default renderString
