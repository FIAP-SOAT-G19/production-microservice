import Joi from 'joi'

const orderSchema = Joi.object({
  orderNumber: Joi.string().required(),
  status: Joi.string().required(),
  totalValue: Joi.number().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().allow(null),
  client: Joi.object({
    name: Joi.string().allow(null),
    email: Joi.string().allow(null),
    cpf: Joi.string().allow(null),
  }).allow(null),
  products: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      image: Joi.string().allow(null),
      amount: Joi.number().required(),
      createdAt: Joi.string(),
    }).min(1)
  )
})

export { orderSchema }
