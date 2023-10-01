import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
// import extendedTables from 'marked-extended-tables'
import customHeadingId from 'marked-custom-heading-id'
import { mangle } from 'marked-mangle'
import katex from 'marked-katex-extension'
import { emoji } from './emoji.js'
import Renderer from './renderer.js'

async function instance () {
  const renderer = await Renderer.call(this)
  const marked = new Marked(
    // extendedTables(),
    customHeadingId(),
    mangle(),
    katex({ throwOnError: false }),
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
    })
  )
  marked.use({ renderer, extensions: [emoji] })
  this.bajoWebMpa.markdown = marked
}

export default instance
