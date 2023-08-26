function isPlainObject (ctx, obj) {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

export default isPlainObject
