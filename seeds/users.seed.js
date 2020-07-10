require('dotenv').config()
const mongoose = require('mongoose')

const { DB_URI_DEV, ADMIN_PASS } = process.env

const dbUri = DB_URI_DEV

const bcrypt = require('bcrypt')

const hashed = bcrypt.hashSync(ADMIN_PASS, 8)

const User = require('../models/Users')

const users = [
  {
    username: 'maintainer',
    email: 'upgrade@email.es',
    password: hashed,
    role: 'admin',
  },
]

const usersInstances = users.map((user) => new User(user))

mongoose
  .connect(dbUri, {
    // So you don't launch warnings when connecting to BD.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to database')

    const user = await User.find()
    console.log('Users in db: ', user)

    // IF they exist, delete the users.
    if (user.length) {
      await User.collection.drop()
      console.log('Drop the db')
    }

    await User.insertMany(usersInstances)
    console.log('Insert user in DB')
  })

  .catch((error) => {
    console.error(error.message)
    console.error('Conection error')
  })
  .finally(() => {
    mongoose.disconnect()
  })
