// load environment variables from .env file
// remember to run this in the root of your project folder
require('dotenv').config()

const bcrypt = require('bcrypt')
const db = require('./index.js')


const email = 'dt@ga.co'
const plainTextPassword = 'pudding'
const saltRounds = 10;

const sql = `
  INSERT INTO 
    users 
    (email, password_digest) 
  VALUES 
    ($1, $2)
  RETURNING
    *;
`

// asynchronous function
// 1. generate salt
bcrypt.genSalt(saltRounds, (err, salt) => {
  // asynchronous function
  // 2. hash the password with the salt
  bcrypt.hash(plainTextPassword, salt, (err, hash) => {
    // asynchronous function
    // 3. store in database
    db.query(sql, [email, hash], (err, result) => {
      if (err) {
        console.log(err)
      }
      // 4. log newly inserted user record
      console.log(result.rows[0])
    })
  })
})