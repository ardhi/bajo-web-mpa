async function util () {
  const { importPkg } = this.bajo.helper
  const {
    kebabCase, omit, mapValues, keys, get, filter, isArray, isEmpty, isString, isPlainObject,
    trim, isNumber, find, each, merge, forOwn, concat, map, camelCase, pick, set
  } = await importPkg('lodash-es')
  const [fs, qs] = await importPkg('fs-extra', 'bajo-extra:query-string')
  this.bajoWebMpa.util = {
    kebabCase,
    omit,
    pick,
    mapValues,
    keys,
    get,
    set,
    filter,
    isArray,
    isEmpty,
    isString,
    isPlainObject,
    trim,
    isNumber,
    find,
    each,
    merge,
    forOwn,
    concat,
    map,
    camelCase,
    qs,
    fs
  }
}

export default util
