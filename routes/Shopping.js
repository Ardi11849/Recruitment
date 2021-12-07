const express = require('express')
const app = express.Router();
var response = require('../config/response');
const auth = require('../middleware/auth');
const ShoppingServices = require('../seeders/ShoppingServices');

/**
* @swagger
* /api/v1/shopping/post:
*   post:
*     tags:
*       - Shopping
*     name: Post shopping
*     summary: Menambahkan data shopping
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - Name
*               - CreatedDate
*             properties:
*               Name:
*                 type: string
*               CreatedDate:
*                 type: string
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Send shopping successfully
*/
// app.post('/api/v1/shopping/post', async (req, res, next) => {
app.post('/api/v1/shopping/post', auth.authorization, async (req, res, next) => {
    result = ShoppingServices.post(req.body)
    .then(result => { console.log(result); res.status(200).send(result) })
    .catch(err => { console.log(err); res.status(200).send(err) });
})

/**
* @swagger
* /api/v1/shopping/getAll:
*   get:
*     tags:
*       - Shopping
*     name: Get shopping
*     summary: Get a shopping
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Get shopping successfully
*/
// app.get('/api/v1/shopping/getAll', async (req, res, next) => {
app.get('/api/v1/shopping/getAll', auth.authorization, async (req, res, next) => {
    result = await ShoppingServices.getAll().catch(error => { response.error(error, res) });
    response.ok(result, res);
})

/**
* @swagger
* /api/v1/shopping/getById:
*   get:
*     tags:
*       - Shopping
*     name: Get shopping
*     summary: Get a shopping
*     parameters:
*       - in: query
*         name: Id
*         type: Number
*         required: true
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Get shopping successfully
*/
// app.get('/api/v1/shopping/getById', async (req, res, next) => {
app.get('/api/v1/shopping/getById', auth.authorization, async (req, res, next) => {
    result = await ShoppingServices.getById(req.query).catch(error => { response.error(error, res) });
    response.ok(result, res);
})

/**
* @swagger
* /api/v1/shopping/put:
*   put:
*     tags:
*       - Shopping
*     name: Private Chatt Sender
*     summary: Send a shopping
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - Id
*               - Name
*               - CreatedDate
*             properties:
*               Id:
*                 type: string
*               Name:
*                 type: string
*               CreatedDate:
*                 type: string
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: Send shopping successfully
*/
// app.put('/api/v1/shopping/put', async (req, res, next) => {
app.put('/api/v1/shopping/put', auth.authorization, async (req, res, next) => {
    await ShoppingServices.put(req.body)
    .then(result => { console.log(result); res.status(200).send(result) })
    .catch(err => { console.log(err); res.status(200).send(err) });
})

/**
* @swagger
* /api/v1/shopping/delete:
*   delete:
*     tags:
*       - Shopping
*     name: shopping
*     summary: delete a shopping
*     parameters:
*       - in: query
*         name: Id
*         type: Number
*         required: true
*     security:
*       - APIKey: []
*     responses:
*       200:
*         description: delete shopping successfully
*/
// app.delete('/api/v1/shopping/delete', async (req, res, next) => {
app.delete('/api/v1/shopping/delete', auth.authorization, async (req, res, next) => {
    console.log(req.body, req.headers)
    result = await ShoppingServices.delete(req.query)
    .then(result => { console.log(result); res.status(200).send(result) })
    .catch(err => { console.log(err); res.status(200).send(err) });
})

module.exports = app;
