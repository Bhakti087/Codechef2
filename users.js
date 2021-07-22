const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.use(express.json())
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.send('err' + err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    res.send('err' + err)
  }
})

router.post('/', async (req, res) => {
  // try {
  //   const user = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     phone: req.body.phone,
  //   })
  // const a1 = await user.save()
  // res.json(a1)
  // res.send(a1)
  // console.log(req.body)
  const user = new User(
    // username: req.body.username,
    // email: req.body.email,
    // phone: req.body.phone,
    // password: req.body.password,
    req.body
  )
  // console.log(user)
  // const newppl = await user.save()
  // console.log(newppl)
  // res.json(newppl)
  user
    .save()
    .then(() => {
      res.status(201).send(user)
    })
    .catch((e) => {
      res.status(400).send(e)
    })

  // .then((user) => {
  //   res.status(201).send(user)
  // })
  // .catch((e) => {
  //   res.status(400).send(e)
  // })
  // const createUser = await user.save()
  // res.send(createUser)
  // })
  // } catch (e) {
  //   res.send('error')
  // }
  // console.log(req.body)
})

router.get('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const usersData = await User.findById(_id)
    console.log(usersData)
    if (!usersData) {
      return res.status(404).send()
    } else {
      res.send(usersData)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    // const user = await User.findById(req.params.id)
    // user.phone = req.body.phone

    // const insertuser = await user.save()
    // res.json(insertuser)
    const _id = req.params.id
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    })
    res.send(updateUser)
  } catch (err) {
    res.status(400).send(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if (!req.params.id) {
      return res.status(404).send()
    }
    res.send(deleteUser)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
