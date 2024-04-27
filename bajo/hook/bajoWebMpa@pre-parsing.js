const bajoWebMpaPreHandler = {
  level: 9,
  handler: async function (ctx, req, reply) {
    const { getConfig, importModule } = this.bajo.helper
    const cfg = getConfig('bajoWebMpa')
    const attachI18N = await importModule('bajoWeb:/lib/attach-i18n.js')
    await attachI18N.call(this, cfg.i18n.detectors, req, reply)
    // darkmode
    if (cfg.darkMode.qsKey) req.dark = req.query[cfg.darkMode.qsKey] ? 'dark' : 'light'
  }
}

export default bajoWebMpaPreHandler
