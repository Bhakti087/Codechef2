const express = require('express')
require('dotenv').config()
const app = express()
const path = require('path')
const User = require('./models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const { check, validateResult } = require('express-validator')
// const { authSchema } = require('./models/joi')
const { UserCredentials } = require('./models/joi')

const port = process.env.PORT || 3000
app.use(express.json())

const userRouter = require('./routes/users')
app.use('/users', userRouter)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected '))
  .catch((err) => console.log(err))

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extented: false }))

app.get('/user', (req, res) => {
  res.send('user')
})

app.get('/register', (req, res) => {
  res.render('register')
})
//handle post here
// app.post('/user', async (req, res) => {
// if (req.body.email) {
//   req.body.phone == null
// } else req.body.email == null
// const { password, username, email, phone } = req.body
// const hash = await bcrypt.hash(password, 12)

// const user = new User({
//   username,
//   password: hash,
//   email,
//   phone,
// })

// await user.save()
// res.redirect('/login')
//thapa
//   try {
//     const addNewUser = new addedUser()
//     console.log(req.body)
//     const insertuser = await addNewUser.save()
//     res.send(insertuser)
//   } catch (e) {
//     res.send(e)
//   }
// })

// app.get('/signup', (req, res) => {
//   res.render('signup.ejs')
// })

// app.get('/forget', (req, res) => {
//   res.render('forget.ejs')
// })
// var checkgmail1 = "@siesgst.ac.in";
// var checkgmail2 = "@gst.sies.edu.in"

// if (!email.EndsWith(checkgmail1) || email.EndsWith(checkgmail2)){
//   throw new Error("Email in invalid format")
// }

// LOGIN POST
// app.post('/register', async (req, res) => {
//   console.log(req.body)
//   if (req.body.email) {
//     await User.find({ email: req.body.email })
//       .then((data) => {
//         if (req.body.password == data.password) {
//           req.session.user = data
//           res.redirect('/register')
//         }
//       })
//       .catch((e) => {
//         console.log(e)
//         res.send('error')
//       })
//   }
//   } else
//   else if (req.body.phone) {
//     await User.find({ phone: req.body.phone })
//       .then((data) => {
//         if (req.body.password == data.password) {
//           req.session.user = data
//           res.redirect('/register')
//         }
//       })
//       .catch((e) => {
//         console.log(e)
//         res.send('error')
//       })
//   } else {
//     res.send('Enter your username password')
//   }
// })

// app.post('/register', async (req, res) => {
//   try {
//     console.log(req.body.username)
//     res.send(req.body.username)
//   } catch (error) {
//     res.status(404).send('error')
//   }
// })

// app.post('/updateuser/:id', async (req, res) => {
//   console.log('Updating')
//   await User.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       $set: {
//         email: req.body.email,
//         password: req.body.password,
//       },
//     },
//     { new: true }
//   )
//     .then((result) => {
//       console.log(result)
//       if (result) {
//         console.log('UserUpdated')
//         res.redirect('/signin')
//       } else {
//         res.send('error')
//       }
//     })
//     .catch((e) => {
//       res.send('error in catch')
//     })
// })
// app.post('/deleteuser/:id', async (req, res) => {
//   await User.findOneAndDelete({ _id: req.params.id })
//     .then((result) => {
//       if (result) {
//         console.log('User deleted')
//         res.redirect('/login')
//       } else {
//         res.send('error')
//       }
//     })
//     .catch((e) => {
//       console.log(e)
//       res.send('error in catch')
//     })
// })

app.post('/register', async (req, res) => {
  // try {

  // const { mail } = req.body
  // const result = await authSchema.validateAsync(req.body)
  // console.log(result)

  const email = req.body.email
  const phone = req.body.phone
  if (email.length <= 0 && phone.length <= 0) {
    res.send('error email')
    return
  }
  let newUser
  if (req.body.email.length > 0) {
    newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
  } else {
    newUser = new User({
      username: req.body.username,
      password: req.body.password,

      phone: req.body.phone,
    })
  }

  // const studentUser = new User({
  // username: req.body.username,
  // password: req.body.password,
  // email: undefined,
  // phone: req.body.phone,

  // })
  console.log(newUser)
  const registered = await newUser.save()
  res.status(201).render('login')

  // } catch (err) {
  //   res.status(400).send(err)
  // }
})

//login check

app.get('/login', (req, res) => {
  res.render('login.ejs')
})
// function validateUser(req, res, next) {
//   const { error } = UserCredentials.validate(req.body)
//   if (error) {
//     next(error)
//   }
//   next()
// }

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const useremail = await User.findOne({ email: email, password: password })
    if (useremail.password === password) {
      res.status(201).send('u are logged in')
    } else {
      res.send('password or email incorrect')
    }
  } catch (error) {
    res.status(400).send('invalid email or password')
  }
})

app.listen(3000, () => {
  console.log(`listening on port the ${port}`)
})
