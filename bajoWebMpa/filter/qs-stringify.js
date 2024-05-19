import qs from 'querystring'

function qsStringify (env, obj) {
  return qs.stringify(obj)
}

export default qsStringify
