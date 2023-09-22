import { EventEmitter } from 'events'
import util from 'util'

function Store (options = {}) {
  this.scope = options.scope
  this.repo = 'MpaSession'
  EventEmitter.call(this)
}

util.inherits(Store, EventEmitter)

Store.prototype.set = function (sessionId, session, callback) {
  const { log } = this.scope.bajo.helper
  const { recordGet, recordCreate, recordUpdate } = this.scope.bajoDb.helper
  const sess = JSON.stringify(session)
  recordGet(this.repo, sessionId, { thrownNotFound: false })
    .then(item => {
      if (!item) return recordCreate(this.repo, { id: sessionId, session: sess }, { skipHook: true, skipValidation: true })
      return recordUpdate(this.repo, sessionId, { session: sess }, { skipHook: true, skipValidation: true })
    })
    .then(item => {
      callback()
    })
    .catch(err => {
      log.error('Session error: %s', err.message)
      callback()
    })
}

Store.prototype.get = function (sessionId, callback) {
  const { log } = this.scope.bajo.helper
  const { recordGet } = this.scope.bajoDb.helper
  recordGet(this.repo, sessionId, { skipHook: true, skipValidation: true })
    .then(item => {
      callback(null, JSON.parse(item.session))
    })
    .catch(err => {
      log.error('Session error: %s', err.message)
      callback()
    })
}

Store.prototype.destroy = function (sessionId, callback) {
  const { log } = this.scope.bajo.helper
  const { recordRemove } = this.scope.bajoDb.helper
  recordRemove(this.repo, sessionId, { skipHook: true, skipValidation: true })
    .then(item => {
      callback()
    })
    .catch(err => {
      log.error('Session error: %s', err.message)
      callback()
    })
}

// TODO: clear expired sessions
Store.prototype.clearExpired = function (callback) {
}

export default Store