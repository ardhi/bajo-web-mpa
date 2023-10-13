async function util () {
  const { importPkg } = this.bajo.helper
  const {
    kebabCase, omit, mapValues, keys, get, filter, isArray, isEmpty, isString, isPlainObject,
    trim, isNumber, find, each, merge, forOwn, concat, map, camelCase, pick, set, isInteger
  } = await importPkg('lodash-es')
  const [fs, qs, emailAddresses] = await importPkg('fs-extra', 'bajo-extra:query-string',
    'bajo-extra:email-addresses')
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
    isInteger,
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
    fs,
    emailAddresses
  }
}

export default util
