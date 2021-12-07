const express = require('express')
const app = express.Router();
var response = require('../config/response');
const auth = require('../middleware/auth');
const userServices = require('../seeders/UserServices');

/**
* @swagger
* /api/v1/user/createUser:
*   post:
*     tags:
*       - Users
*     name: Post User
*     summary: Menambahkan user baru type data json
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - Username
*               - Password
*               - Email
*               - Phone
*               - Country
*               - City
*               - PostCode
*               - Name
*               - Address
*             properties:
*               Username:
*                 type: string
*               Password:
*                 type: string
*               Email:
*                 type: string
*               Phone:
*                 type: string
*               Country:
*                 type: string
*               City:
*                 type: string
*               PostCode:
*                 type: string
*               Name:
*                 type: string
*               Address:
*                 type: string
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Send Users successfully
*/
// app.post('/api/v1/user/createUser', async (req, res, next) => {
app.post('/api/v1/user/createUser', async (req, res, next) => {
    result = userServices.createUser(req.body)
    .then(result => { console.log(result); res.status(200).send(result) })
    .catch(err => { console.log(err); res.status(200).send(err) });
})

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN, { expiresIn: '1800s' });
}

/**
* @swagger
* /api/v1/Login:
*   get:
*     tags:
*       - Users
*     name: Login Users
*     summary: Services login untuk para user
*     parameters:
*       - in: query
*         name: Username
*         schema:
*           type: string
*         required: true
*       - in: query
*         name: Password
*         schema:
*           type: string
*         required: true
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Get Users successfully
*/
// app.get('/api/v1/Login', async (req, res, next) => {
app.get('/api/v1/Login', async (req, res, next) => {
      // const token = generateAccessToken({ username: req.body.username });
      // res.json(token);
    var result = await userServices.Login(req.query).catch(error => { response.error(error, res) });
    response.ok(result, res)
})

/**
* @swagger
* /api/v1/GetAll:
*   get:
*     tags:
*       - Users
*     name: GetAll Users
*     summary: Services GetAll untuk para user
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Get Users successfully
*/
// app.get('/api/v1/GetAll', async (req, res, next) => {
app.get('/api/v1/GetAll', async (req, res, next) => {
      // const token = generateAccessToken({ username: req.body.username });
      // res.json(token);
    var result = await userServices.GetAll(req.query).catch(error => { response.error(error, res) });
    response.ok(result, res)
})

module.exports = app;
