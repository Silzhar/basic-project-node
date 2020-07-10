/* eslint-disable import/no-unresolved */
require('dotenv').config()
require('./config/db')

const express = require('express')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const passport = require('./config/passport')
const userRoute = require('./routes/user.auth.routes')

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

const { isAuthenticated, isAdminRole } = require('./middlewares/auth.middleware')
const errorMiddleware = require('./middlewares/error.middleware')

server.use(
  session({
    secret: 'cookie-secret-test',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
)

server.use(passport.initialize())
server.use(passport.session())
server.use(errorMiddleware)

server.use('/api/user', userRoute)
server.use('/api/admin', [isAuthenticated, isAdminRole])

const { PORT } = process.env
server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
