function mailto (env, text) {
  const { emailAddresses, isEmpty } = this.bajoWebMpa.util
  let { address, name } = emailAddresses.parseOneAddress(text)
  if (isEmpty(name)) name = address
  return `<a href="mailto:${address}">${name}</a>`
}

export default mailto
