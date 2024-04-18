import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'

function validatorMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {

    validate(plainToInstance(type, req.body), { skipMissingProperties })

      .then((errors: ValidationError[]) => {

        if (errors.length > 0) {

          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next({ status: 400, message: message });

        } 
        
        else { next() }

      })

      .catch((error: any) => {
        next({ status: 500, message: 'Internal Server Error' })
    })
  }
}

export default validatorMiddleware;