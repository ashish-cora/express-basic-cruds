const mongoose = require('mongoose')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const badRequestError = require('../errors/bad-request')
const { UnauthenticatedError } = require('../errors')

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new badRequestError("plz provide email & password")
    }

    const loggedUser = await User.findOne({email})

    console.log("idk", loggedUser);

    if(!loggedUser){
        throw new UnauthenticatedError('provided account is not found :(')
    }

    const state = await loggedUser.comparePassword(password);
    
    if(!state) {
        throw new UnauthenticatedError("incorrect Password")
    }

    const token = loggedUser.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: loggedUser.name }, token });
    
}

const register = async (req, res) => {
    const user = await User.create( {...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token})
}

module.exports = {
    login, register
}