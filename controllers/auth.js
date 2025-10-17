const mongoose = require('mongoose')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const badRequestError = require('../errors')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    res.send('login user')
}
const register = async (req, res) => {
  
    const user = await User.create( {...req.body})
    res.status(StatusCodes.CREATED).json({user})
}

module.exports = {
    login, register
}