const Joi = require('joi')
const mongoose = require('mongoose');

const Customer =mongoose.model('Customers',new mongoose.Schema({
    name: { 
      type:String,
      required:true,
      minlength:5,
      maxlength:50,
      },
      isGold:{
          type:Boolean,
          default:false
      },
      phone:{
        type:String,
        minlength:5,
        maxlength:15,
        }
}));

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      isGold: Joi.boolean(),
      phone: Joi.string().min(3).max(50).required()
    };
    return Joi.validate(customer, schema);
}
exports.Customer = Customer;
exports.validate = validateCustomer;