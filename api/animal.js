const model = require('../models/index');
const animalModel = model.animal;
const express = require('express');
const md5 = require('md5')
const app = express();

/**
 * @swagger
 * /animal:
 *   get:
 *     summary: Get all animals
 *     description: Retrieve a list of all animals.
 *     tags: 
 *       - Animal
 *     responses:
 *       200:
 *         description: A list of animals.
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
 *                   class:
 *                     type: string
 *                   legs:
 *                     type: integer
 *       404:
 *         description: No animals found.
 *       400:
 *         description: Error fetching animals.
 */

/**
 * @swagger
 * /animal/create:
 *   post:
 *     summary: Create a new animal
 *     description: Creates a new animal with name, class, and number of legs.
 *     tags: 
 *       - Animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               class:
 *                 type: string
 *               legs:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully created a new animal.
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
 *                     class:
 *                       type: string
 *                     legs:
 *                       type: integer
 *       400:
 *         description: Animal already exists or failed to create animal.
 */

/**
 * @swagger
 * /animal/{id}:
 *   get:
 *     summary: Get an animal by ID
 *     description: Retrieve a single animal by its ID.
 *     tags: 
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the animal to retrieve
 *     responses:
 *       200:
 *         description: A single animal.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 class:
 *                   type: string
 *                 legs:
 *                   type: integer
 *       404:
 *         description: Animal not found.
 *       400:
 *         description: Error fetching animal.
 */

/**
 * @swagger
 * /animal/{id}:
 *   put:
 *     summary: Update an animal by ID
 *     description: Updates an animal's information based on the provided ID.
 *     tags: 
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the animal to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               class:
 *                 type: string
 *               legs:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated the animal.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       201:
 *         description: Successfully created a new animal.
 *       400:
 *         description: Failed to update animal.
 */

/**
 * @swagger
 * /animal/{id}:
 *   delete:
 *     summary: Delete an animal by ID
 *     description: Deletes an animal from the database by ID.
 *     tags: 
 *       - Animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the animal to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the animal.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Animal not found.
 *       400:
 *         description: Failed to delete animal.
 */

app.post('/create', async(req, res) => {
    let data = {
        name: req.body.name,
        class: req.body.class,
        legs: req.body.legs,
    }

    try {
        let existingAnimal = await animalModel.findOne({ where: { name: data.name, class: data.class } });
        if (existingAnimal) {
            return res.status(400).json({
                message: "Animal already exists"
            });
        }

        let result = await animalModel.create(data);
        return res.status(200).json({
            message: "Success to Add Animal",
            data: result
        });

    } catch (error) {
        return res.status(400).json({
            message: "Failed to Add Animal",
            error: error.message
        });
    }
});


app.get('/', async (req, res) => {
    try {
        let animals = await animalModel.findAll();

        if (animals.length === 0) {
            return res.status(404).json({
                message: "No animals found"
            });
        }

        return res.status(200).json({
            data: animals
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

app.get('/:id', async (req, res) => {
    try {
        let animal = await animalModel.findOne({ where: { id: req.params.id } });

        if (!animal) {
            return res.status(404).json({
                message: "Animal not found"
            });
        }

        return res.status(200).json({
            data: animal
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

app.put('/:id', async (req, res) => {
    let data = {
        name: req.body.name,
        class: req.body.class,
        legs: req.body.legs,
    };

    try {
        let animal = await animalModel.findOne({ where: { id: req.params.id } });

        if (animal) {
            await animalModel.update(data, { where: { id: req.params.id } });
            return res.status(200).json({
                data: data,
                message: "Success Update Animal"
            });
        } else {
            let newAnimal = await animalModel.create(data);
            return res.status(201).json({
                data: newAnimal,
                message: "Success Create New Animal"
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});


app.delete('/:id', async (req, res) => {
    try {
        let animal = await animalModel.findOne({ where: { id: req.params.id } });

        if (!animal) {
            return res.status(404).json({
                message: "Animal not found"
            });
        }

        await animalModel.destroy({ where: { id: req.params.id } });
        return res.status(200).json({
            message: "Success Delete Animal"
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});


module.exports = app;