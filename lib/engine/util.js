async function util () {
  const { importPkg } = this.bajo.helper
  const {
    kebabCase, omit, mapValues, keys, get, filter, isArray, isEmpty, isString, isPlainObject,
    trim, isNumber, find, each
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
    trim,
    isNumber,
    find,
    each,
    fs
  }
}

export default util