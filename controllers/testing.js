const express = require('express')
const User = require('../models/user')
const Blog = require('../models/blog')

const router = express.Router()

router.post('/reset', async(req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = router
