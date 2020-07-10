const passport = require('passport')
// Import the strategy directly on the variable LocalStrategy.
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 12

const User = require('../models/Users')

passport.use(
  'register',
  new LocalStrategy(
    {
      // Passport gets these two fields from req.body.
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    // email and password in callback because passport got them from req.body.
    async (req, email, password, done) => {
      try {
        // Check basic role. Return if you try to change role.
        if (req.body.role && req.body.role !== 'basic') {
          const error = new Error('Only basic status')
          return done(error, null)
        }

        // We check that the email used does not exist in the database.
        const previousUser = await User.findOne({
          email: email.toLowerCase(),
        })

        // If there is a user in the DB with the same email, we return an error to the user.
        if (previousUser) {
          const error = new Error('El email utilizado ya está en uso')
          return done(error, null)
        }

        // Check in password: 8 characters, uppercase, lowercase and numbers.
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)

        if (!isValid) {
          const error = new Error(
            'La contraseña no es válida. Debe tener 8 caracteres, mayúsculas, minúsculas y números'
          )
          return done(error, null)
        }

        // We do a hash with the user's password.
        const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = new User({
          username: req.body.username,
          email,
          password: hashPassword,
          role: req.body.role || 'basic',
        })

        await newUser.save()

        // If there is success saving the user, I call done() without error and with the user.
        return done(null, newUser)
      } catch (err) {
        // If the code fails, we send the error through the callback to the path.
        return done(err, null)
      }
    }
  )
)

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        //  We look for a user by email in the DB.
        const userByEmail = await User.findOne({
          email: email.toLowerCase(),
        })

        // We will have an error if a user that does not exist tries to login.
        if (!userByEmail) {
          const error = new Error('El email introducido no existe')
          return done(error, null)
        }

        //  Check that the password sent by the user matches the hash of the DB.
        const isPasswordValid = await bcrypt.compare(password, userByEmail.password)

        //  If the password doesn't match, we send an error.
        if (!isPasswordValid) {
          const error = new Error('Combinación de email y contraseña incorrecta')
          return done(error, null)
        }

        // If everything is valid, we return the user correctly.
        return done(null, userByEmail)
      } catch (err) {
        //  If the code fails, we send the error through the callback to the path.
        return done(err, null)
      }
    }
  )
)

// Middlewares for session management.

// Using passport, we call done () with its _id to create an identifying session.
passport.serializeUser((user, done) => done(null, user._id))

// Search for a user given the id that is in the session cookie and put it in req.user.
passport.deserializeUser(async (userId, done) => {
  try {
    const dbUser = await User.findById(userId)
    done(null, dbUser)
  } catch (err) {
    done(err.message, null)
  }
})

// After configuring passport we export it to require it in index.js.
module.exports = passport
