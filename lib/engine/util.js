async function util () {
  const { importPkg } = this.bajo.helper
  const {
    kebabCase, omit, mapValues, keys, get, filter, isArray, isEmpty, isString, isPlainObject
  } = await importPkg('lodash-es')
  const fs = await importPkg('fs-extra')
  this.bajoWebMpa.util = {
    kebabCase,
    omit,
    mapValues,
    keys,
    get,
    filter,
    isArray,
    isEmpty,
    isString,
    isPlainObject,
    fs
  }
}

export default util
