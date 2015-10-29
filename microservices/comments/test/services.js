require('should')

var services

describe('services', () => {
  before(require('./helpers/clean_database'))
  before(() => {
    services = require('../src/services')
  })

  it('comments-create', done => {
    services.create({
      app_id: 'teste',
      artifact_id: 1,
      account_id: 1,
      comment: 'comentário'
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      success.data.id.should.be.equal(1)
      success.data.app_id.should.be.equal('teste')
      success.data.artifact_id.should.be.equal(1)
      success.data.comment.should.be.equal('comentário')
      success.data.created_at.should.be.ok()
      success.data.updated_at.should.be.ok()
      done()
    })
  })

  it('comments-remove', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err, success) {
      if (err) return done(err)
      success.message.should.be.ok()
      done()
    })
  })

  it('comments-remove (not found)', done => {
    services.remove({
      app_id: 'teste',
      id: 1
    }, function (err) {
      err.message.should.be.ok()
      done()
    })
  })

  it('comments-list-by-artifact-id (TODO: mock)')
})
