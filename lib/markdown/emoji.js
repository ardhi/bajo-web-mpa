// based on: https://github.com/rinzool/marked-twemoji/blob/main/index.js
import * as nodeEmoji from 'node-emoji'

export const emoji = {
  name: 'emoji',
  level: 'inline',
  start (src) {
    return src.indexOf(':')
  },
  tokenizer (src, _) {
    const rule = /^:(\w+):/
    const match = rule.exec(src)
    if (match) {
      return {
        type: 'emoji',
        raw: match[0],
        emoji: match[1]
      }
    }
  },
  renderer (token) {
    return nodeEmoji.emojify(token.raw)
  }
}
