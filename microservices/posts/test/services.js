require('should')

var services

describe('services', () => {
  before(require('./helpers/clean_database'))
  before(() => {
    services = require('../src/services')
  })

  it('posts-create', done => {
    services.create({
      app_id: 'teste',
      account_id: 1,
      title: 'titulo',
      body: 'texto'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.account_id.should.be.equal(1)
      success.data.title.should.be.equal('titulo')
      success.data.body.should.be.equal('texto')
      success.data.created_at.should.be.ok()
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('posts-update', done => {
    services.update({
      app_id: 'teste',
      id: 1,
      title: 'mudei',
      body: 'mudei tambem'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.title.should.be.equal('mudei')
      success.data.body.should.be.equal('mudei tambem')
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('posts-update (not found)', done => {
    services.update({
      app_id: 'teste',
      id: 2
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('posts-read (not found)', done => {
    services.read({
      app_id: 'teste',
      id: 2
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('posts-list', done => {
    services.list({
      app_id: 'teste'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.length.should.be.equal(1)
      success.data[0].id.should.be.equal(1)
      success.data[0].app_id.should.be.equal('teste')
      success.data[0].account_id.should.be.equal(1)
      success.data[0].title.should.be.equal('mudei')
      success.data[0].body.should.be.equal('mudei tambem')
      success.data[0].created_at.should.be.ok()
      success.data[0].updated_at.should.be.ok()
      done()
    })
  })

  it('posts-remove', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      done()
    })
  })

  it('posts-remove (not found)', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('posts-read (TODO: mock)')
})
