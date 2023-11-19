const {Schema, model} = require('mongoose');

const Joi = require("joi");

const{handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
      password: {
        type: String,
        required: [true, 'Set password for user'],
      },
      email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
      },
      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },
      token: {
        type: String,
        default: ""
      },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string(),
    token: Joi.string(),
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const updateStatusSchema = Joi.object({
  _id: Joi.string().required(),
  subscription: Joi.any().valid('starter', 'pro', 'business').required().error(new Error('enter a valid user subscription')),
})

const schemas = {
    registerSchema,
    loginSchema,
    updateStatusSchema
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas
}