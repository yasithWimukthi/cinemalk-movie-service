const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    cast:  Joi.string().required(),
    description: Joi.string().required()

})
module.exports = schema;