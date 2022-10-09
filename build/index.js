"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let persons = [
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
];
app.get('/api/persons', (request, response) => {
    const person = persons.map(person => person);
    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
});
// app.get('/info',(request: any,response: { send: (arg0: string) => void })=>{
//     response.send(`<p>Phonebook has info for ${persons.length} people</p>`)
//     // response.send(new Date().toISOString())
// })
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
});
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end();
});
const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0;
    return maxId + 1;
};
app.post('/api/persons', (request, response) => {
    const body = request.body;
    // if(!body.name){
    //     return response.status(400).json({error:'no content'})
    // }
    // console.log(body.name);
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    };
    persons = persons.concat(person);
    response.json(person);
});
const PORT = 5000;
app.listen(PORT);
console.log(`Server running on PORT ${PORT}`);
