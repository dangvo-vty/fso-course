const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.status(200).send(users)
})

userRouter.post('/', async(request, response) => {
    const {username, name, password} = request.body

    if (password.length < 5) {
        return response.status(400).send({error: "password min 5 charactors "})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    console.log(passwordHash)

    const user = new User({
        username: username,
        name: name,
        passwordHash: passwordHash
    })

    const userSaved = await user.save()
    
    response.status(201).send(userSaved)
})

module.exports = userRouter
