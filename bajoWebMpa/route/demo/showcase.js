async function showcase (ctx, req, reply) {
  const { importPkg } = this.bajo.helper
  const { find, merge } = await importPkg('lodash-es')
  const theme = find(this.bajoWebMpa.themes, { name: req.theme })
  const locals = merge({}, theme)
  await reply.view('bajoWebMpa:/demo/showcase', locals)
}

export default showcase
