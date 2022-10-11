
import dotenv from 'dotenv'
dotenv.config()
import express,{Response,Request} from 'express';
import cors from 'cors' ;
import Person from './model/person';
import morgan from 'morgan';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(express.static('build'))
app.use(morgan('tiny'))
morgan(':method :url :status :res[content-length] - :response-time ms')


app.get('/api/persons',async(_req:Request,res:Response)=>{
   const persons = await Person.find({})
   return res.json(persons)
})

app.get('/api/persons/:id',async(req:Request<{id:string}>,res:Response)=>{
    const id =req.params.id
    const person = await Person.findById(id)
    return res.json(person)
})

app.post('/api/persons', async(req:Request<{},{},{name:string,number:string}>,res:Response)=>{
    const {name,number} = req.body

    if(name === undefined){
        return res.status(400).json({error:'missing name'})
    }

    const person = new Person({
        name:name,
        number:number
    })
   const savedPerson = await person.save()
    return res.json(savedPerson)
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    
    console.log(`Server running on PORT ${PORT}`)
})
//app.get('/api/persons',(_req:Request, res:Response)=>{
     // Person.find({}).then(person => res.json(person))
    // const person = persons.map(person=>person)
    // if(person){
    //     res.json(person)
    // }else{
    //     res.status(404).end()
    // }
// })
// app.get('/info',(request: any,response: { send: (arg0: string) => void })=>{
//     response.send(`<p>Phonebook has info for ${persons.length} people</p>`)
//     // response.send(new Date().toISOString())
 
// })

// app.get('/api/persons/:id',(req:Request, res:Response)=>{
//     const id = Number(req.params.id)
//     const person = persons.find(person => person.id === id)
//     if(person){
//         res.json(person)
//     }else{
//         res.status(404).end()
//     }
// })

// app.delete('/api/persons/:id',(request, response)=>{
//     const id = Number(request.params.id)
//      persons = persons.filter(person => person.id !== id)
//      response.status(204).end()
// })

// const generateId=()=>{
//     const maxId = persons.length > 0 ? Math.max(...persons.map(p=> p.id)) : 0 
//     return maxId + 1 
// }

// app.post('/api/persons',(req:Request<{},{},{name:string,number:string},{}>, res:Response)=>{
//     const body = req.body
//     if(!body.name || !body.number){
//          res.status(404).json({error:'no content'})
//     }
//     const person ={
//         id:generateId(),
//         name:body.name,
//         number:body.number
//     }

//     console.log(body.name,person.name);
//     persons = persons.concat(person)
//      return res.json(person) 
// })