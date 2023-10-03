async function renderer () {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa')
  return {
    table (header, body) {
      return `
        <table class="${cfg.markdown.tableClass}">
          <thead class="${cfg.markdown.tableHeadClass}">${header}</thead>
          <tbody class="${cfg.markdown.tableBodyClass}">${body}</tbody>
        </table>
        `
    }
  }
}

export default renderer
