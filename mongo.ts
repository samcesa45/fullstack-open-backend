import {Schema,connect, model, connection} from "mongoose";

type IPerson={
    name:string,
    number:string
}

const url = "mongodb+srv://username:<password>@cluster0.lumxc.mongodb.net/personApp?retryWrites=true&w=majority"

const personSchema = new Schema({
    name:{type:String},
    number:{type:String}
}) 

const Person = model<IPerson>('Person',personSchema)

connect(url)
.then(()=>{
    console.log('connected');
    
    const person = new Person({
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    })

    return person.save()
})
.then(()=>{
    console.log('person saved!');
    return connection.close()
    
})
.catch(err=>console.log(err))