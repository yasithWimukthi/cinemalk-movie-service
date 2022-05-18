const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string().required(),
    released_date:  Joi.string().required(),
    overview: Joi.string().required(),
    genre: Joi.string().required()

})
module.exports = schema;