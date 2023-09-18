function format (text = '') {
  // const all = text.match(/<([^<>]*)>/g)
  const { filter } = this.scope.bajoWebMpa.util
  const all = filter((text ?? '').split('\n').map(t => {
    return t.replace(/\s\s+/g, ' ').replace('\r', '')
  }), a => !['', ' ', ' class=""', ' style=""'].includes(a))
  return all.join('\n')
    .replaceAll('class=" ', 'class="')
    .replaceAll('style=""', '')
    .replaceAll('\n>', '>')
    .replace(/  +/g, ' ')
    .replaceAll(' >', '>')
    .replaceAll('\n <', '\t')
    .replaceAll('\n ', ' ')
    .replaceAll('\t', '\n <')
    .replaceAll('</div>\n ', '</div>\n')
    .replaceAll('\n>', '>')
}

export default format
