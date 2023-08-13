async function error (ctx) {
  ctx.setErrorHandler(async function (err, req, reply) {
    reply.code(err.statusCode || 500)
    return await reply.view('bajoWebMpa:/500', { error: err })
  })
}

export default error
