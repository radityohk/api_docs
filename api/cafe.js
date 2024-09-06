const model = require('../models/index');
const cafeModel = model.cafe;
const express = require('express');
const md5 = require('md5')
const app = express();
const {auth} = require('../auth/auth')
const {allowRoles} = require('../auth/role');

/**
 * @swagger
 * /cafe:
 *   get:
 *     summary: Get all cafe
 *     description: Retrieve a list of all cafe.
 *     tags: 
 *       - Cafe
 *     responses:
 *       200:
 *         description: A list of cafe.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   phoneNumber:
 *                     type: string
 *       400:
 *         description: Bad request or error fetching cafe.
 */

/**
 * @swagger
 * /cafe/create:
 *   post:
 *     summary: Create a new cafe
 *     description: Creates a new cafe with name, address, and phone number.
 *     tags: 
 *       - Cafe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created a new cafe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phoneNumber:
 *                       type: string
 *       400:
 *         description: Failed to create cafe.
 */

/**
 * @swagger
 * /cafe/{id}:
 *   put:
 *     summary: Update a cafe by ID
 *     description: Updates a cafe's information based on the provided ID.
 *     tags: 
 *       - Cafe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cafe to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the cafe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Failed to update cafe.
 */

/**
 * @swagger
 * /cafe/{id}:
 *   delete:
 *     summary: Delete a cafe by ID
 *     description: Deletes a cafe from the database by ID.
 *     tags: 
 *       - Cafe
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the cafe to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the cafe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed to delete cafe.
 */

app.post('/create', auth, allowRoles(['superadmin', 'owner']), async(req, res) => {
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.startsWith('0')) {
            return '+62' + phoneNumber.slice(1);
        }
        return phoneNumber; 
    }
    
    let data = {
        name: req.body.name,
        address: req.body.address,
        phoneNumber: formatPhoneNumber(req.body.phoneNumber), 
    }

    await cafeModel.create(data)
    .then(result => {
        return res.status(200).json ({
        message: "Success to Add Cafe",
        data: data,
       })
    })
    .catch(error => {
        return res.status(400).json({
            message: "Failed to Add Cafe",
        })
    })
})

app.get('/', auth, allowRoles(['superadmin', 'owner']), async(req, res) => {
    await cafeModel.findAll()
    .then(result => {
        return res.status(200).json({
            data: result
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

app.put('/:id', auth, allowRoles(['superadmin', 'owner']), async(req, res) => {
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber.startsWith('0')) {
            return '+62' + phoneNumber.slice(1);
        }
        return phoneNumber; 
    }
    
    let data = {
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber ? formatPhoneNumber(req.body.phoneNumber) : undefined, 
    }
    
    await cafeModel.update(data, {where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: data,
            message: "Success Update Cafe"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

app.delete('/:id', auth, allowRoles(['superadmin', 'owner']), async(req, res) => {
    await cafeModel.destroy({where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: result,
            message: "Success Delete Cafe"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

module.exports = app;