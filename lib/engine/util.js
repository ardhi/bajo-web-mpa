async function util () {
  const { importPkg } = this.bajo.helper
  const [qs, emailAddresses] = await importPkg('bajoExtra:query-string',
    'bajoExtra:email-addresses')
  this.bajoWebMpa.util = { qs, emailAddresses }
}

export default util
