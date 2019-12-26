const Joi = require('joi')

function validate(object, schema) {
  /*
    const schema = {
        name: Joi.string().min(3).required()
    }
  */
    return Joi.validate(object, schema)
 }

 module.exports = { validate }
