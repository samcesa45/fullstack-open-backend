import { Request,Response, NextFunction } from 'express'
import logger from './logger'

const requestLogger = (req:Request, _res:Response, next:NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unknownEndPoint=(_req:Request,res:Response) => {
  res.status(404).send({ error:'unknown endpoint' })

}
const errorHandler=(error:Error,_req:Request ,res:Response,next:NextFunction) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    res.status(400).send({ error:'malformatted id' })
  }else if(error.name === 'ValidationError'){
    res.status(400).send({ error:error.message })
  }

  next(error)
}

export default {
  requestLogger,
  unknownEndPoint,
  errorHandler
}