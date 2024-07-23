async function collectViewEngines (ctx) {
  const { eachPlugins, importModule, join } = this.app.bajo
  const { merge } = this.app.bajo.lib._
  this.viewEngines = []
  this.log.debug('Collect view engines')
  const me = this
  await eachPlugins(async function ({ file, ns }) {
    const mod = await importModule(file)
    const resp = await mod.call(this.app[ns], ctx)
    if (!Array.isArray(resp.fileExts)) resp.fileExts = [resp.fileExts]
    resp.fileExts.map(ext => ext[0] !== '.' ? ('.' + ext) : ext)
    me.viewEngines.push(merge(resp, { ns }))
    me.log.trace('- %s@%s (%s)', resp.name, ns, join(resp.fileExts))
  }, { glob: 'view.js', baseNs: this.name })
}

export default collectViewEngines
