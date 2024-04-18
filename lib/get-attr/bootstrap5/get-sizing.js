function getSizing (value, context) {
  const { get, keys } = this.scope.bajo.helper._
  const sizing = get(context, 'ctx._meta.theme.mapping.sizing', {})
  return keys(sizing).includes(value) ? sizing[value] : null
}

export default getSizing
