const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  console.log(req.session.userId)

  db.query(`SELECT * FROM dishes ORDER BY id;`, (err, result) => {
    if (err) {
      console.log(err);
    }

    const dishes = result.rows
    res.render('home', { dishes: dishes })
  })
})

module.exports = router
