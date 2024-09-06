const model = require('../models/index');
const userModel = model.user;
const express = require('express');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'testJWT';
const app = express();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login 
 *     description: Login with username and password to receive JWT token for authorization.
 *     tags: 
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Successful login and JWT token received.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 logged:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Incorrect username or password.
 *       401:
 *         description: Unauthorized.
 */

app.post('/login', async(req, res) => {
    try {
        // Cari user berdasarkan username dan password
        let result = await userModel.findOne({ 
            where: {
                username: req.body.username,
                password: md5(req.body.password)
            } 
        });

        // Jika user ditemukan
        if (result) {
            let payload = {
                id: result.id,
                username: result.username,
                role: result.role,
            };
            let token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); 

            return res.status(200).json({ 
                status: "success",
                logged: true,
                token: token,
                data: payload,
            });
        } else {
            // Jika username atau password salah
            return res.status(400).json({ 
                status: "error",
                message: "Username atau password salah",
            });
        }
    } catch (error) {
        // Error handling umum
        return res.status(500).json({
            status: "error",
            message: "Terjadi kesalahan pada server",
            error: error.message
        });
    }
});

module.exports = app;
