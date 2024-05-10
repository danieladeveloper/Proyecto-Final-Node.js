'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://veronica:vdanielagt@cluster0.bvriyga.mongodb.net/curso2024",{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("Conexión a la database establecida con éxito");
    var server = app.listen(port, () =>{
        console.log(`Listening on port ${port}`)
    });

    server.timeout = 120000;
})
.catch(err=> console.log(err));
