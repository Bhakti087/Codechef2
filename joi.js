// const Joi = require('@hapi/Joi')
// import BaseJoi from 'joi'
// import JoiEmailExtensions from 'joi-email-extensions'

// const Joi = BaseJoi.extend([JoiEmailExtensions])
// const authSchema = Joi.object({
//   mail: Joi.string().email().lowercase(),
// })
const Joi = require('joi')
// const joiEmailExtensions = require('joi-email-extensions')
// const Joi = fun.extend(joiEmailExtensions)
// const UserCredentials = Joi.object({
//   user: Joi.object({
//     phone: Joi.string().allow(''),
//     email: Joi.string()
//       .email()
//       //   .domain(['siesgst.ac.in', 'gst.sies.edu.in'])
//       //   .pattern(new RegExp('^$|^.*@siesgst.ac.in'))
//       .allow(''),
//   }).or('email', 'phone'),
// })

// module.exports = {
//   authSchema: authSchema, if req.body.length>0 email> '
// ' ||
// }
// module.exports = UserCredentials

const schema = Joi.alternatives().conditional(
  Joi.object({ email: '' }).unknown(),
  {
    then: Joi.object({
      username: Joi.string(),
      phone: { type: String, unique: true },
      password: Joi.string(),
    }),
    otherwise: Joi.object({
      username: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    }),
  }
)
