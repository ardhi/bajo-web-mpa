async function showcase (ctx, req, reply) {
  req.theme = req.params.theme
  await reply.view('bajoWebMpa:/demo/showcase')
}

export default showcase
