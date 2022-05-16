const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required(),
    noOfSeats:  Joi.number().integer().required(),
    address: Joi.string().required(),
    phone: Joi.string()

})
module.exports = schema;