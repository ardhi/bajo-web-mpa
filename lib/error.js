const extHandler = async function (ctx, err, req, reply) {
  const { importModule } = this.bajo.helper
  if (err.message === 'notfound' || err.statusCode === 404) {
    const { handler } = await importModule('bajoWebMpa:/lib/not-found.js', { asDefaultImport: false })
    return await handler.call(this, req, reply)
  }
  return await reply.view('bajoWebMpa:/500', { error: err })
}

async function error (ctx) {
  const { importModule } = this.bajo.helper
  const errorHandler = await importModule('bajoWeb:/lib/error-handler.js')
  await errorHandler.call(this, ctx, extHandler)
}

export default error
