async function global () {
  const { importPkg, eachPlugins, importModule } = this.bajo.helper
  const { isFunction, camelCase } = await importPkg('lodash-es')
  const me = this
  await eachPlugins(async function ({ file, plugin, fileInfo }) {
    const name = plugin === 'bajoWebMpa' ? fileInfo.objName : camelCase(`${plugin} ${fileInfo.objName}`)
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
