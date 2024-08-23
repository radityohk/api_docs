const model = require('../models/index');
const menuModel = model.menu;
const express = require('express');
const md5 = require('md5')
const app = express();
const {auth} = require('../auth/auth')
const {allowRoles} = require('../auth/role');

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get all menu
 *     description: Retrieve a list of all menu.
 *     tags: 
 *       - Menu
 *     responses:
 *       200:
 *         description: A list of menu.
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
 *                   price:
 *                     type: number
 *                     format: float
 *                   isRecommendation:
 *                     type: boolean
 *       400:
 *         description: Bad request or error fetching menu.
 */

/**
 * @swagger
 * /menu/create:
 *   post:
 *     summary: Create a new menu
 *     description: Creates a new menu with name, price, and recommendation status.
 *     tags: 
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               trueOrFalse:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully created a new menu.
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
 *                     price:
 *                       type: number
 *                       format: float
 *                     isRecommendation:
 *                       type: boolean
 *       400:
 *         description: Failed to create menu.
 */

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update a menu by ID
 *     description: Updates a menu's information based on the provided ID.
 *     tags: 
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the menu to update
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
 *         description: Successfully updated the menu.
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
 *         description: Failed to update menu.
 */

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Delete a menu by ID
 *     description: Deletes a menu from the database by ID.
 *     tags: 
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the menu to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed to delete menu.
 */

app.post('/create', auth, allowRoles(['superadmin']), async(req, res) => {
    let data = {
        name: req.body.name,
        price: req.body.price, //float
        isRecommendation: req.body.trueOrFalse //bool (true, false)
    }

    await menuModel.create(data)
    .then(result => {
        return res.status(200).json ({
        message: "Success to Add Menu",
        data: result,
       })
    })
    .catch(error => {
        return res.status(400).json({
            message: "Failed to Add Menu",
        })
    })
})

app.get('/', auth, async(req, res) => {
    await menuModel.findAll()
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

app.put('/:id', auth, async(req, res) => {
    let data = {
        name: req.body.name,
        price: req.body.price, //float
        isRecommendation: req.body.trueOrFalse //bool (true, false)
    }

    await menuModel.update(data, {where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: data,
            message: "Success Update menu"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

app.delete('/:id', auth, async(req, res) => {
    await menuModel.destroy({where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: result,
            message: "Success Delete menu"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

module.exports = app;