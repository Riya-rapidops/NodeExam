const mongoose = require("mongoose");
const Joi = require('joi');

//define schema
let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    phone: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 10
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },

});

const tableName = "user";
const User = mongoose.model(tableName, userSchema);

//Validation For All Field
const validateUser = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255),
    phone: Joi.string().min(10).max(10).required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    address: Joi.string().min(10).required()

});

exports.User =  User;
exports.validateUser = validateUser;
