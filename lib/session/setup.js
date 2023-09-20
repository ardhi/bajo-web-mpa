import Store from './store.js'

async function session (ctx) {
  const { importPkg } = this.bajo.helper
  const { omit } = await importPkg('lodash-es')
  const [fcookie, fsession, fflash] = await importPkg('bajo-web:@fastify/cookie',
    'bajo-web:@fastify/session', 'bajo-web:@fastify/flash')
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWebMpa', { clone: true })
  this.bajoWebMpa.sessionStore = this.bajoWebMpa.sessionStore ?? new Store({ scope: this })
  const setting = cfg.session
  setting.store = this.bajoWebMpa.sessionStore
  ctx.register(fcookie)
  ctx.register(fsession, omit(setting, []))
  ctx.register(fflash)
}

export default session
