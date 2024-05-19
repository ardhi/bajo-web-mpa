function mailto (env, text) {
  let [name, email] = text.split(' <')
  if (!email) email = name
  email = email.replaceAll('<', '').replaceAll('>', '')
  return `<a href="mailto:${email}">${name}</a>`
}

export default mailto
