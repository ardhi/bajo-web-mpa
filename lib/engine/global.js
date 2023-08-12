async function global () {
  const { importPkg, eachPlugins, importModule } = this.bajo.helper
  const { isFunction } = await importPkg('lodash-es')
  const me = this
  await eachPlugins(async function ({ file, plugin, fileInfo }) {
    const name = plugin === 'bajoWebMpa' ? fileInfo.name : fileInfo.nameWithPlugin
    let mod = await importModule(file)
    if (isFunction(mod)) {
      const old = mod
      mod = function (...args) {
        return old.call(me, this, ...args)
      }
    }
    this.bajoWebMpa.viewEngine.addGlobal(name, mod)
  }, { glob: 'global/*.js' })
}

export default global
