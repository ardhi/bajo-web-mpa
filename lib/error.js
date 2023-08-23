const extHandler = async function (err, req, reply) {
  return await reply.view('bajoWebMpa:/500', { error: err })
}

async function error (ctx) {
  const { importModule, getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWeb', { full: true })
  const errorHandler = await importModule(`${cfg.dir}/lib/error-handler.js`)
  await errorHandler.call(this, ctx, extHandler)
}

export default error
