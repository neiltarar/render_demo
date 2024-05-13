const db = require('../db')

function setCurrentUser(req, res, next) {
  // making the currentUser object available in every template
  res.locals.currentUser = {} 
  res.locals.isLoggedIn = false

  // guard condition - if user is not logged in
  if (!req.session.userId) {
    return next()
  }

  // lets fetch the user record from the db
  const sql = `
    SELECT * FROM users WHERE id = $1;
  `

  db.query(sql, [req.session.userId], (err, result) => {
    if (err) console.log(err);

    let user = result.rows[0] // {id: 1, email: 'dt@ga.co'}

    // set the current user
    res.locals.currentUser = user
    res.locals.isLoggedIn = true
    next()
  })
  
}

module.exports = setCurrentUser




