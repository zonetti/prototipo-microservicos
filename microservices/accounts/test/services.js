require('should')

var services

describe('services', () => {
  before(require('./helpers/clean_database'))
  before(() => {
    services = require('../src/services')
  })

  it('accounts-create', done => {
    services.create({
      app_id: 'teste',
      name: 'teste',
      username: 'teste',
      password: 'teste'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.name.should.be.equal('teste')
      success.data.username.should.be.equal('teste')
      success.data.password.should.be.equal('teste')
      success.data.created_at.should.be.ok()
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('accounts-login', done => {
    services.login({
      app_id: 'teste',
      username: 'teste',
      password: 'teste'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.name.should.be.equal('teste')
      success.data.username.should.be.equal('teste')
      success.data.password.should.be.equal('teste')
      success.data.created_at.should.be.ok()
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('accounts-login (invalid username)', done => {
    services.login({
      app_id: 'teste',
      username: 'teste2',
      password: 'teste'
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('accounts-login (invalid password)', done => {
    services.login({
      app_id: 'teste',
      username: 'teste',
      password: 'foobar'
    }, function (err, success) {
      err.message.should.be.ok()
      done()
    })
  })

  it('accounts-update', done => {
    services.update({
      app_id: 'teste',
      id: 1,
      name: 'mudei',
      password: 'mudei tambem'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.name.should.be.equal('mudei')
      success.data.password.should.be.equal('mudei tambem')
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('accounts-update (not found)', done => {
    services.update({
      app_id: 'teste',
      id: 2
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('accounts-read', done => {
    services.read({
      app_id: 'teste',
      id: 1
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.name.should.be.equal('mudei')
      success.data.username.should.be.equal('teste')
      success.data.password.should.be.equal('mudei tambem')
      success.data.created_at.should.be.ok()
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('accounts-read (not found)', done => {
    services.read({
      app_id: 'teste',
      id: 2
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('accounts-list', done => {
    services.list({
      app_id: 'teste'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.length.should.be.equal(1)
      success.data[0].id.should.be.equal(1)
      success.data[0].app_id.should.be.equal('teste')
      success.data[0].name.should.be.equal('mudei')
      success.data[0].username.should.be.equal('teste')
      success.data[0].password.should.be.equal('mudei tambem')
      success.data[0].created_at.should.be.ok()
      success.data[0].updated_at.should.be.ok()
      done()
    })
  })

  it('accounts-remove', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      done()
    })
  })

  it('accounts-remove (not found)', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })
})
