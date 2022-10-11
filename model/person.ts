import dotenv from 'dotenv'
dotenv.config()
import { Schema,connect, model } from "mongoose";

type IPerson={
    name:string,
    number:string
}

const password = process.env.MONGODB_URI
const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new Schema<IPerson>({
    name:String,
    number:String
})

const run=async()=>{
  //connect to mongoose 
  await connect(url)
  console.log('connected')
  console.log('person saved!')
}

run().catch(err=>console.log(err))

personSchema.set('toJSON',{
   transform:(_document,returnedObject)=>{
     returnedObject.id = returnedObject._id.toString()
     delete returnedObject._id 
     delete returnedObject.__v
   }
})

const Person = model<IPerson>('Person',personSchema)

export default Person




