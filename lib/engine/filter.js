async function filter () {
  const { importPkg, eachPlugins, importModule } = this.bajo.helper
  const { isFunction, camelCase } = await importPkg('lodash-es')
  await eachPlugins(async function ({ file, plugin, fileInfo }) {
    const name = plugin === 'bajoWebMpa' ? fileInfo.objName : camelCase(`${plugin} ${fileInfo.objName}`)
    let mod = await importModule(file)
    if (isFunction(mod)) mod = mod.bind(this)
    this.bajoWebMpa.viewEngine.addFilter(name, mod)
  }, { glob: 'filter/*.js' })
}

export default filter
