async function markdownParse (content) {
  return await this.bajoWebMpa.markdown.parse(content, { async: true })
}

export default markdownParse
