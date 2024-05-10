const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => { 
    res.send('hola guapa')

})

app.post('/', (req, res) => { 
    res.send('hola guapa')

})

app.put('/', (req, res) => { 
    res.send('hola guapa')

})

app.delete('/', (req, res) => { 
    res.send('hola guapa')

})

app.listen(port, () =>{
    console.log('escuchando')
})