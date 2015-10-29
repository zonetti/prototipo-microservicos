module.exports = {

  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',

  amqp: 'URL_DE_CONEXAO',

  db: {

    development: {
      client: 'sqlite3',
      connection: {
        filename: __dirname + '/databases/comments_dev.db'
      },
      migrations: {
        tableName: '_migrations'
      }
    },

    test: {
      client: 'sqlite3',
      connection: {
        filename: __dirname + '/databases/comments_test.db'
      },
      migrations: {
        tableName: '_migrations'
      }
    },

    production: {
      client: 'sqlite3',
      connection: {
        filename: __dirname + '/databases/comments.db'
      },
      migrations: {
        tableName: '_migrations'
      }
    }

  }

}
