function mailto (env, text) {
  const { emailAddresses } = this.bajoWebMpa.util
  const { isEmpty } = this.bajo.helper._
  let { address, name } = emailAddresses.parseOneAddress(text)
  if (isEmpty(name)) name = address
  return `<a href="mailto:${address}">${name}</a>`
}

export default mailto
