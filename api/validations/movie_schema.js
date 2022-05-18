const Joi = require('joi')

const schema = Joi.object({
    title: Joi.string().required(),
    release_date:  Joi.string().required(),
    overview: Joi.string().required(),
    genres: Joi.string().required()

})
module.exports = schema;