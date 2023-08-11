async function global () {
  const { importPkg, eachPlugins, importModule } = this.bajo.helper
  const { isFunction } = await importPkg('lodash-es')
  await eachPlugins(async function ({ file, plugin, fileInfo }) {
    const name = plugin === 'bajoWebMpa' ? fileInfo.name : fileInfo.nameWithPlugin
    let mod = await importModule(file)
    if (isFunction(mod)) mod = mod.bind(this)
    this.bajoWebMpa.viewEngine.addGlobal(name, mod)
  }, { glob: 'global/*.js' })
}

export default global
