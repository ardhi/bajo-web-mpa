export async function handler (req, reply) {
  const { print } = this.bajo.helper
  const message = print.__('Route \'%s (%s)\' not found', req.url, req.method)
  reply.code(404)
  const ret = await reply.view('bajoWebMpa:/404', { message })
  return ret
}

async function notFound (ctx) {
  const me = this
  await ctx.setNotFoundHandler(async function (req, reply) {
    return await handler.call(me, req, reply)
  })
}

export default notFound
