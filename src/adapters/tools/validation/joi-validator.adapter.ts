
import { ISchemaValidator } from '@/interfaces'
import * as schemas from './order.schema'

export class JoiValidatorSchemaAdapter implements ISchemaValidator {
  validate (input: ISchemaValidator.Input): ISchemaValidator.Output {
    const schema = (schemas as Record<string, any>)[input.schema]
    return schema.validate(input.data)
  }
}
