function mailto (env, text) {
  const { emailAddresses } = this.bajoWebMpa.util
  const addr = emailAddresses.parseOneAddress(text)
  return `<a href="mailto:${addr.address}">${addr.name}</a>`
}

export default mailto
