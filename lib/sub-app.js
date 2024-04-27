async function subApp (ctx) {
  const { log, importModule } = this.bajo.helper
  const { collect } = await importModule('bajoWeb:/lib/app.js', { asDefaultImport: false })
  const mods = await collect.call(this, 'boot.js', 'bajoWebMpa')
  for (const m of mods) {
    log.debug('Boot sub app: %s', m.plugin)
    await m.handler.call(this, ctx)
  }
}

export default subApp
