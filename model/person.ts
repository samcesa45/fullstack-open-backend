
import { Schema,model } from 'mongoose'
import { IPerson } from '../types/types'


const personSchema = new Schema<IPerson>({
  name:{ type:String,minlength:3,required:true },
  number:{ type:String,required:true }
})


personSchema.set('toJSON',{
  transform:(_document,returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = model<IPerson>('Person',personSchema)

export default Person




