import Joi from 'joi'

const orderSchema = Joi.object({
  clientId: Joi.string().guid({
    version: ['uuidv4']
  }),
  clientDocument: Joi.string(),
  status: Joi.string(),
  totalValue: Joi.number(),
  client: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    cpf: Joi.string()
  }),
  products: Joi.array().items(
    Joi.object({
      id: Joi.string().guid({
        version: ['uuidv4']
      }).required(),
      name: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      amount: Joi.number().required()
    }).min(1)
  )
})

export { orderSchema }
