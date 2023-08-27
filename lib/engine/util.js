async function util () {
  const { importPkg } = this.bajo.helper
  const { kebabCase, omit, mapValues, keys, get, filter } = await importPkg('lodash-es')
  const fs = await importPkg('fs-extra')
  this.bajoWebMpa.util = { kebabCase, omit, mapValues, keys, get, filter, fs }
}

export default util
