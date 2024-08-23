const model = require('../models/index');
const userModel = model.user;
const express = require('express');
const md5 = require('md5')
const app = express();
const {auth} = require('../auth/auth')
const {allowRoles} = require('../auth/role');
const user = require('../models/user');

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags: 
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   fullname:
 *                     type: string
 *                   role:
 *                     type: string
 *       400:
 *         description: Bad request or error fetching users.
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with username, fullname, password, and role.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created a new user.
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
 *                     username:
 *                       type: string
 *                     fullname:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Failed to create user.
 */

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Updates a user's information based on the provided ID.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               fullname:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the user.
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
 *         description: Failed to update user.
 */

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a user from the database by ID.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Failed to delete user.
 */

app.post('/create', auth, allowRoles(['superadmin']), async(req, res) => {
    let data = {
        username: req.body.username,
        fullname: req.body.fullname,
        password: md5(req.body.password),
        role: req.body.role,
    }

    await userModel.create(data)
    .then(result => {
        return res.status(200).json ({
        message: "Success to Add User",
        data: result,
        code: 200
       })
    })
    .catch(error => {
        return res.status(400).json({
            message: "Failed to Add User",
        })
    })
})

app.get('/', auth, allowRoles(['superadmin']), async(req, res) => {
    await userModel.findAll()
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
        username: req.body.username,
        fullname: req.body.fullname,
        password: req.body.password ? md5(req.body.password) : undefined,
        role: req.body.role,
    }

    await userModel.update(data, {where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: data,
            message: "Success Update User"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

app.delete('/:id', auth, async(req, res) => {
    await userModel.destroy({where: {id: req.params.id}})
    .then(result => {
        return res.status(200).json({
            data: result,
            message: "Success Delete User"
        })
    })
    .catch(error => {
        return res.status(400).json({
            message: error
        })
    })
})

module.exports = app;