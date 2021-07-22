const mongoose = require('mongoose')
const validator = require('validator')

// var value = '@siesgst.ac.in'
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be blank'],
    // unique: true,
    minlength: 2,
  },

  password: {
    type: String,
    min: 4,
    required: [true, 'Password cannot be blank'],
  },
  phone: {
    type: String,
    // unique: true,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email })
        if (user) {
          if (this.id === user.id) {
            return true
          }
          return false
        }
        return true
      },
      message: (props) => 'The specified email address is already in use.',
    },
  },
})
// required: [true, 'User email required'],

// validate(value) {
//   if (value.length > 0) {
//     if (!validator.isEmail(value)) {
//       throw new Error(' invalid format')
//     }
//   }

// if (!validator.isEmail(value)) {
//   throw new Error('Email in invalid format')
// }

// },

module.exports = mongoose.model('User', userSchema)
