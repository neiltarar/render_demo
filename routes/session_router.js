const express = require('express')
const router = express.Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  // 1. get the email & password from the request
  const email = req.body.email
  const plainTextPassword = req.body.password

  // validate the user input
  if (email && email.length < 3) {
    return res.render('login', { errorMessage: 'email is too short' })
  }


  // 2. check if user exists in the database using the email address
  const sql = `
    SELECT *
    FROM users
    WHERE email = $1;
  `

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err)
      return res.render('login')
    }

    
    if (result.rows.length === 0) {
      console.log('user not found')
      return res.render('login', { errorMessage: 'incorrect email or password' })
    }

    // 3. check password is valid or not
    const hashedPassword = result.rows[0].password_digest

    bcrypt.compare(plainTextPassword, hashedPassword, (err, isCorrect) => {
      if (err) console.log(err)

      if (!isCorrect) {
        console.log('password doesnt match')
        return res.render('login', { errorMessage: 'incorrect email or password' })
      }

      // 4. yay - its time to create a session for this user
      req.session.userId = result.rows[0].id
      res.redirect('/')
    })


  })

})

router.delete('/logout', (req, res) => {
  req.session.userId = null
  res.redirect('/login')  
})

module.exports = router
