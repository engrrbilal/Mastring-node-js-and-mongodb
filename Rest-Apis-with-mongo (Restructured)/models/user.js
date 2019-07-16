const Joi = require('joi')
const mongoose = require('mongoose');

const User =mongoose.model('Users',new mongoose.Schema({
    name: { 
      type:String,
      required:true,
      minlength:5,
      maxlength:50,
      },
    email: { 
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255,
        },
    password: { 
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
        },
}));

function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(3).max(255).required().email(),
      password: Joi.string().min(3).max(1024).required()
    };
    return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;