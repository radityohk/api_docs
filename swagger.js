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
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', 
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: 'Auth'
            },
            {
                name: 'Users'
            },
            {
                name: 'Cafe'
            },
            {
                name: 'Menu'
            }
        ]
    },
    apis: [__dirname + '/api/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
