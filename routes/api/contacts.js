const express = require('express');

const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const router = express.Router();

const {HttpError} = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (_, res, next) => {
  try{
    const result = await contactsOperations.listContacts();
    res.json(result);
  }
  catch(error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsOperations.getById(contactId);
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error){
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error){
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted"
    })
  }
  catch(error){
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try{
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result){
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error){
    next(error);
  }
})

module.exports = router
