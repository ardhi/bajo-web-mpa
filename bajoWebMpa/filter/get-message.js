function getMessage (env, obj = {}, field) {
  const { find } = this.bajoWebMpa.util
  const item = find(obj.details ?? [], { field })
  return item ? item.error : undefined
}

export default getMessage
