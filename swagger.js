const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation for ExpressJS Portofolio',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
        tags: [
            {
                name: 'Animal'
            },
        ]
    },
    apis: [__dirname + '/api/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
