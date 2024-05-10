'use strict'

const express = require('express');
const {body} = require('express-validator');
var api = express.Router();

var middleware = require("../middleware/middleware");

var UsersController = require("../controllers/users");
var AuthController = require("../controllers/auth");

//Login, logout
api.post('/login', [
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],AuthController.login_user);
api.post('/logout', middleware.userprotectUrl, AuthController.logout);

//usuarios
api.get('/user', middleware.userprotectUrl, UsersController.userlist);
api.get('/user/:iduser', middleware.userprotectUrl, UsersController.userSingular);
api.post('/user', middleware.userprotectUrl, [
    body("iduser").not().isEmpty(),
    body("name").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],UsersController.createuser);
api.put('/user/:iduser',middleware.userprotectUrl,[
    body("iduser").not().isEmpty(),
    body("name").not().isEmpty(),
    body("apellido").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()
],UsersController.updateuser);
api.delete('/user/:iduser',middleware.userprotectUrl, UsersController.deleteuser);

module.exports = api;