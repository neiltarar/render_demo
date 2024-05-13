const pg = require('pg') // for connecting to the postgres database

// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// non mac folks
//  protocol
//              username
//                    password
//                          host
//                                  port
//                                        database name
// 'postgresql://user:pass@localhost:5432/goodfoodhunting'

const connectionString = process.env.DATABASE_URL

const pool = new pg.Pool({
  connectionString: connectionString   // include user & password non mac users   
})

module.exports = pool