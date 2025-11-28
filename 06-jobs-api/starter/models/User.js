const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'plz provide name'],
        minLength:3,
        maxLength: 35
    },
    email: {
        type: String,
        required: [true, 'plz provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'plz provide valid email' 
        ],
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'plz provide '],
        minLength:6,
       
    },
})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (plainPassword) {
    // await bcrypt.compare( plainPassword, this.password, function (err, result){
    //     return result;
    // })
    const result = await bcrypt.compare( plainPassword, this.password)
    return result
}

module.exports = mongoose.model('User', UserSchema)