function isString (ctx, obj) {
  const { isArray } = this.bajoWebMpa.util
  return isArray(obj)
}

export default isString
