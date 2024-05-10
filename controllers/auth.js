'use strict'

const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');

var Users = require('../models/users');
var Sessions = require('../models/accesstoken');

var controller = {

    login_user : function (req, res){

        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()){
            return res.status(400).send({ status:400, errors: errors.array()})
        }

        var data = req.body;

        Users.findOne({email:data.email})
        .then(usuarios=>{

            bcrypt.compare(data.password, usuarios.password, function(err, result){
                // result == true
                if(result){

                    const payload = {
                        user:usuarios
                    }
    
                    let acces_token = jwt.sign(payload, process.env.KEY, {
                        expiresIn: '1d'
                    });
    
                    let today= new Date().toISOString();
    
                    let update_session = {
                        user:usuarios.email,
                            key: acces_token,
                            creationDate: today,
                            expirationDate: '1d',
                            active: true
    
                    }
    
                    Sessions.findOneAndUpdate({user: usuarios.email}, update_session, {upsert: true, new:true})
                    .then(session=>{
                        if(!session){
                            return res.status(401).send({
                                status:401,
                                message:"Usuario no Encontrado"});
                        }
                    
                        return res.status(200).send({
                            status:200,
                            message:"Usuario Actualizado",
                            token: acces_token
    
                        });
                    })
                    .catch(error=> {
                        console.error(error);
                        return res.status(500).send({
                            status:500,
                            message: "Error detectado"
                        });
                    });
    
         
                }else{
                    return res.status(401).send({
                        status:401,
                        message:"Datos no válidos"
                    });
                }
           
           
           
           
            })
            

        })
        .catch(error=> {
            console.error(error);
            return res.status(401).send({
                status:401,
                message: "Datos no válidos"
            });
        });

    },

    logout: function(req, res){
        const token = req.headers['x-curso2024-access-token'];

        console.log(req.decoded);
        Sessions.findOneAndDelete({user:req.decoded.user.email, key:token})
        .then(usuarios=>{
            if(!usuarios){
                return res.status(200).send({
                    status:200,
                    message:"Token no válido"});
            }
            return res.status(200).send({
                status:200,
                message:"Sesión finalizada",
            });
        })
        .catch(error=> {
            console.error(error);
            return res.status(500).send({
                status:500,
                message: "Token no válido"
            });
        });
    }
}

module.exports = controller;

