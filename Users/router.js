const express = require('express')
const router = express.Router()

const { user_profile, signup, allUsers, login, updateProfile } = require('./controller')

router.get('/profile', user_profile)
router.get('/all-users',allUsers)

router.post('/signup', signup)
router.post('/login', login)

router.put('/update-profile', updateProfile)

module.exports = router