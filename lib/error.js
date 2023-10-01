const extHandler = async function (ctx, err, req, reply) {
  const { importModule, getConfig } = this.bajo.helper
  if (err.message === 'notfound' || err.statusCode === 404) {
    const cfg = getConfig('bajoWebMpa', { full: true })
    const { handler } = await importModule(`${cfg.dir.pkg}/lib/not-found.js`, { asDefaultImport: false })
    return await handler.call(this, req, reply)
  }
  return await reply.view('bajoWebMpa:/500', { error: err })
}

async function error (ctx) {
  const { importModule, getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWeb', { full: true })
  const errorHandler = await importModule(`${cfg.dir.pkg}/lib/error-handler.js`)
  await errorHandler.call(this, ctx, extHandler)
}

export default error
