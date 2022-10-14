import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
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