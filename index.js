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

    users.push({id: shortid.generate(),...data});

    res.status(201).json({data: users});
})

server.delete("/api/users/:id", (req,res) => {
    const id = req.params.id;

    const deletedUser = users.filter(user => user.id == id);

    res.status(200).json({data: deletedUser})
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id

    const user = users.filter(user => user.id == id)

    res.status(200).json({data: user})

})

server.put("/api/users/:id", (req, res) => {
    const id = req.params.id
    const changes = req.body

    const found = users.find(user => user.id === id)

    if (found) {
        Object.assign(found, changes);

        res.status(200).json({data: users})
    } else {
        res.status(404).json({ message: "User not found"})
    }
})

const port = 5000;
server.listen(port, () => console.log("api running"));