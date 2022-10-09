

import express,{Response,Request} from 'express';
import morgan from 'morgan';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(morgan('tiny'))

morgan(':method :url :status :res[content-length] - :response-time ms')

type Person={
    id:number,
    name:string,
    number:string
}
let persons:Person[] = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(_req:Request, res:Response)=>{
    const person = persons.map(person=>person)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})
// app.get('/info',(request: any,response: { send: (arg0: string) => void })=>{
//     response.send(`<p>Phonebook has info for ${persons.length} people</p>`)
//     // response.send(new Date().toISOString())
 
// })

app.get('/api/persons/:id',(req:Request, res:Response)=>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        res.json(person)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/persons/:id',(request, response)=>{
    const id = Number(request.params.id)
     persons = persons.filter(person => person.id !== id)
     response.status(204).end()
})

const generateId=()=>{
    const maxId = persons.length > 0 ? Math.max(...persons.map(p=> p.id)) : 0 
    return maxId + 1 
}

app.post('/api/persons',(req:Request<{},{},{name:string,number:string},{}>, res:Response)=>{
   
    const body = req.body

   
    if(!body.name || !body.number){
         res.status(404).json({error:'no content'})
    }


    

    const person ={
        id:generateId(),
        name:body.name,
        number:body.number
    }

    console.log(body.name,person.name);
    
    
        
    
    // const personName = persons.find(person=> person)?.name
    // if(personName?.match(body.name)){
  
    //  return res.status(400).json({error:'name or number must be unique'})  
        
    // }


    persons = persons.concat(person)
    return res.json(person) 

    



  


    
    
  
       
    
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log(`Server running on PORT ${PORT}`)