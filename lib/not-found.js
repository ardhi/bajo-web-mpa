async function notFound (ctx) {
  const { print } = this.bajo.helper
  await ctx.setNotFoundHandler(async function (req, reply) {
    const message = print.__('Route \'%s (%s)\' not found', req.url, req.method)
    reply.code(404)
    await reply.view('bajoWebMpa:/404', { message })
  })
}

export default notFound
