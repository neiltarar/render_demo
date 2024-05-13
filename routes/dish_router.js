const express = require('express')
const db = require('../db')
const ensureLoggedIn = require('../middlewares/ensureLoggedIn')
const router = express.Router()


router.get('/dishes/:id', (req, res) => {
  const sql = `
    SELECT * FROM dishes WHERE id = $1;
  `

  const commentsSql = `
    SELECT comments.id as comment_id, * FROM comments
    JOIN users
    ON comments.user_id = users.id
    WHERE dish_id = $1;
  `

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    // we are expecting just one record
    const dishObj = result.rows[0]

    db.query(commentsSql, [req.params.id], (err, result) => {
      if (err) console.log(err)

      const comments = result.rows

      console.log(comments)

      // we have the dish & the comments
      // now we're ready to send a response back to the client

      res.render('show', { 
        dish: dishObj, 
        comments: comments 
      })
    })
  })
})

router.get('/share', ensureLoggedIn, (req, res) => {
  res.render('share')
})
//          |
//          v
// route - http method + path
router.post('/dishes', ensureLoggedIn, (req, res) => {
  let title = req.body.title
  let imageUrl = req.body.image_url
  let description = req.body.description

  let sql = `
    INSERT INTO dishes 
    (title, image_url, description, user_id) 
    VALUES 
    ($1, $2, $3, $4);
  `
  // insert the dish into the database
  // asychonrous functions
  db.query(sql, [title, imageUrl, description, req.session.userId], (err, result) => {
    if (err) {
      console.log(err);
    }

    // get post redirect
    // sending a response back to the client to make another request
    // forcing to user to make another request
    res.redirect('/')
  })
})

router.delete('/dishes/:id', (req, res) => {
  // construct a SQL statement
  const sql = `
    DELETE FROM dishes WHERE id = $1;
  `

  // send the sql to the db
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }

    // in the callback redirect the user back to the home page
    res.redirect('/')
  })
})

router.get('/dishes/:id/edit', (req, res) => {
  // fetch the record from the database
  const sql = `
    SELECT * FROM dishes WHERE id = $1;
  `
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err);
    }
    const dish = result.rows[0]
    res.render('edit', { dish: dish })
  })  

})

router.put('/dishes/:id', (req, res) => {
  const title = req.body.title
  const imageUrl = req.body.image_url
  const description = req.body.description
  const dishId = req.params.id

  const sql = `
    UPDATE 
      dishes 
    SET 
      title = $1, 
      image_url = $2, 
      description = $3
    WHERE
      id = $4;
  `

  db.query(sql, [title, imageUrl, description, dishId], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect(`/dishes/${dishId}`)
  })

})

module.exports = router