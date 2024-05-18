import { InvalidParamError, MissingParamError, SchemaValidationError, NotFoundError } from './'
import { badRequest, notFound, serverError,  } from '../helpers/http.helper'
import { HttpResponse } from '@/interfaces'

export const handleError = (error: any): HttpResponse => {
  if (
    error instanceof InvalidParamError || 
    error instanceof MissingParamError || 
    error instanceof SchemaValidationError
  ) {
    return badRequest(error)
  }

  if (error instanceof NotFoundError) {
    return notFound(error)
  }
  return serverError(error)
}
