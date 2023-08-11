async function showcase (ctx, req, reply) {
  const { importPkg } = this.bajo.helper
  const { find, merge } = await importPkg('lodash-es')
  req.theme = req.params.theme
  const theme = find(this.bajoWebMpa.themes, { name: req.theme })
  const locals = merge({}, { theme, themes: this.bajoWebMpa.themes })
  await reply.view('bajoWebMpa:/demo/showcase', locals)
}

export default showcase
