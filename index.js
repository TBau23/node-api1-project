const express = require('express');
const shortid = require('short-id')

const server = express();

server.use(express.json())

server.get("/", (req,res) => {
    res.status(200).json({hello: 'Tom Bauerz'})
})

let users = [
    // {
    //     id: shortid.generate(),
    //     name: 'Frodo Baggins',
    //     bio: 'Ring bearer, hobbit from the Shire.'
    // },
    // {
    //     id: shortid.generate(),
    //     name: 'Samwise Gamgee',
    //     bio: 'Faithful friend to Frodo, hobbit from the Shire.'
    // }
]

server.get("/api/users", (req,res) => {
    res.status(201).json({data: users})
})

server.post("/api/users", (req, res) => {

    const data = req.body;

    if (data.hasOwnProperty("name") && data.hasOwnProperty("bio")){
    users.push({id: shortid.generate(),...data});
    
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    }

    res.status(201).json({data: users});
})

server.delete("/api/users/:id", (req,res) => {
    const id = req.params.id;

    const found = users.find(user => user.id == id);

    if (found) {
        res.status(200).json({data: deletedUser})
    }
    else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    }

    
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    const found = users.find(user => user.id == id)

    if (found) {
    res.status(200).json({data: user})
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
    }

})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const changes = req.body

    const found = users.find(user => user.id === id)

    if (changes.hasOwnProperty("name") &&
     changes.hasOwnProperty("bio") && found) {
        Object.assign(found, changes);

        res.status(200).json({data: users})
    } else if (!changes.hasOwnProperty('name') || !changes.hasOwnProperty('bio')) {
        res.status(400).json({ message: "Please provide name and bio for user."})
    } 
    else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
    }
})

const port = 5000;
server.listen(port, () => console.log("api running"));