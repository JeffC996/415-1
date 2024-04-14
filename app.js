const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Lab REST API',
            version: '1.0.0',
            description: 'My REST API',
        }
    },
    apis: ['./app.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.use(express.json())


cars = ['toyota', 'honda', 'ford']

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the car
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Returns a welcome message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: hello world
 */
app.get('/', (req, res) => {
    res.send('hello world')
})


/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Returns a list of cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/cars', (req, res) => {
    res.send(cars)
})


/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a car by its index
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A car
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Car not found
 */
app.get('/cars/:id', (req, res) => {
    var id = req.params.id
    var car = cars[id]
    if (!car) {
        res.status(404).send('car not found')
        return
    }
    res.send(car)
})


/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created
 *       400:
 *         description: Car name is required
 */
app.post('/cars', (req, res) => {
    // create a car
    var car = req.body.name
    if (car) {
        cars.push(car)
        res.status(201).send('car created')
    } else {
        res.status(400).send('car name is required')
    }
})


/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car by its index
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       200:
 *         description: Car updated
 *       400:
 *         description: Car name is required
 */
app.put('/cars/:id', (req, res) => {
    var id = req.params.id
    var car = req.body.name
    if (car) {
        cars[id] = car
        res.status(200).send('car updated')
    } else {
        res.status(400).send('car name is required')
    }
})

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by its index
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car deleted
 *       404:
 *         description: Car not found
 */
app.delete('/cars/:id', (req, res) => {
    var id = req.params.id
    if (!cars[id]) {
        res.status(404).send('car not found')
        return
    }
    cars.splice(id, 1)
    res.status(200).send('car deleted')
})

/**
 * @swagger
 * /config:
 *  get:
 *    summary: Get the environment variables
 *    tags: [Config]
 *    responses:
 *      200:
 *       description: Returns the environment variables
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties:
 *               type: string
 */
app.get('/config', (req, res) => {
    var env_config = process.env;
    console.log(env_config);
    res.json(env_config);
})


/**
 * @swagger
 * /fib:
 *   get:
 *     summary: Get the Fibonacci sequence
 *     tags:
 *       - Fibonacci
 *     parameters:
 *       - in: query
 *         name: length
 *         required: true
 *         description: The number of elements in the Fibonacci sequence to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the Fibonacci sequence
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.get('/fib', (req, res) => {
    const length = parseInt(req.query.length, 10);
    const fibSequence = [0, 1];
    for (let i = 2; i < length; i++) {
        fibSequence[i] = fibSequence[i - 1] + fibSequence[i - 2];
    }
    res.json(fibSequence.slice(0, length)); // 返回请求的斐波那契数列长度
});
// ----------------------------------------

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})