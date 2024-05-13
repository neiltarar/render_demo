// load environment variables from .env file
require('dotenv').config()

const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger')
const methodOverride = require('method-override')
const dishRouter = require('./routes/dish_router')
const sessionRouter = require('./routes/session_router')
const homeRouter = require('./routes/home_router')
const commentRouter = require('./routes/comment_router')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const ensureLoggedIn = require('./middlewares/ensureLoggedIn')

app.set('view engine', 'ejs')

//    http request
//----------+
//          |
//          v
app.use(expressLayouts)
//          |
//          v
// http://localhost:8080/style.css
// serve static files such as images, video, css & client side js in public folder
app.use(express.static('public'))
//          |
//          v
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
//          |
//          v
// check request body for data in urlencoded format
// and parse into an object req.body = { title: 'tacos' }
app.use(express.urlencoded())
//          |
//          v
app.use(requestLogger)
//          |
//          v
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 }, // 3 days
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
//          |
//          v
app.use(setCurrentUser)


app.use(homeRouter)
app.use(sessionRouter)
app.use(dishRouter)
app.use(commentRouter)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
