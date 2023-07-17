const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//static signup method
userSchema.statics.signup = async function(email,password) {

    if(!email || !password){
        throw Error('Please Fill in ALl the Fields')
    }
    if(!validator.isEmail(email)){
        throw Error('Not a Valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Not a Strong Password')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('email already exists')
    }

    const salt = await  bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email , password: hash})
    return user

}

//static login method
userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('all fields must be filled')
    }

    const user = await this.findOne({ email })
    console.log(user.password)
    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User',userSchema)