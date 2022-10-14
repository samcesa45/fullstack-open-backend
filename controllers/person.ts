/* eslint-disable @typescript-eslint/ban-types */
import express,{ Response,Request, NextFunction } from 'express'
import Person from '../model/person'

const personRouter = express.Router()



personRouter.get('/',async(_req:Request,res:Response) => {
  const persons = await Person.find({})
  return res.json(persons)
})

personRouter.get('/:id',async(req:Request<{id:string}>,res:Response) => {
  const id =req.params.id
  const person = await Person.findById(id)
  return res.json(person)
})

personRouter.post('/', async(req:Request<{},{},{name:string,number:string}>,res:Response,next:NextFunction) => {
  const { name,number } = req.body

  if(name === undefined){
    res.status(400).json({ error:'missing name' })
  }

  const person = new Person({
    name:name,
    number:number
  })

  try {
    const savedPerson = await person.save()
    res.json(savedPerson)

  } catch (error) {
    next(error)
  }
})

personRouter.put('/:id',async(error:Error,req:Request<{id:string},{},{name:string,number:string}>,res:Response,next:NextFunction) => {
  const id = req.params.id
  const { name,number } = req.body

  const person ={
    name:name,
    number:number
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id,person,{ new:true })
    res.json(updatedPerson)

  } catch (err) {
    //this is the way to access the error message
    console.log(error.message)

    next(err)
  }
})

personRouter.delete('/:id',async(req:Request<{id:string}>,res:Response,next:NextFunction) => {
  const id = req.params.id
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})


export default personRouter