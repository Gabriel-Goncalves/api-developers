const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const developerRoute = require('./routes/developer');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Extend:
// https://swagger.io/specification/
// https://www.npmjs.com/package/swagger-jsdoc
// https://www.npmjs.com/package/swagger-ui-express
// https://www.youtube.com/watch?v=apouPYPh_as
const options = {
  definition: {
    info: {
      title: 'Developer API',
      description: 'CRUD API for developers',
      version: '1.0.0',
      contact: {
        name: 'Gabriel Gonçalves',
        url: 'https://gabriel-goncalves.github.io/',
        email: 'gabriel_98gm@hotmail.com',
      },
      servers: ['http://localhost:3000/'],
    },
  },
  apis: ['index.js', 'routes/developer.js'],
};

const openapiSpecification = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

// Routes
/**
 * @swagger
 * /developer:
 *  get:
 *    description: Get all developers
 *    responses:
 *      '200':
 *          description: Success response
 *          schema: [{"id": 1, "fullName": "Gabriel Gonçalves Medeiros", "cellphone": "55532541", "phone": null, "specialties": "JavaScript Python CSHARP", "cep": "74000000", "street": "Rua dos Alfeneiros", "neighborhood": "Little Whingeing", "city": "Surrey", "state": "England"}, {"id": 2, "fullName": "Matheus Goyas", "cellphone": "31982457684", "phone": "3135587468", "specialties": "Java, C++, HTML", "cep": "75380252", "street": "Rua dos empresários", "neighborhood": "Centro", "city": "Belo Horizonte", "state": "BH"}]
 *      '404':
 *          description: Not found
 * 
 * @swagger
 * /developer:
 *  post:
 *    description: Insert a developer
 *    parameters:
 *     - in: body
 *       name: fullName
 *       type: string
 *       description: Full name of the developer
 *     - in: body
 *       name: cellphone
 *       type: string
 *       description: Contact number
 *     - in: body
 *       name: cep
 *       type: integer
 *       description: CEP of the developer
 *     - in: body
 *       name: phone
 *       type: string
 *       description: Contact phone
 *     - in: body
 *       name: specialties
 *       type: array
 *       items: 
 *        type: string
 *       description: Specialties of the developer
 *     - in: body
 *       name: cep
 *       type: string
 *       description: CEP of the developer
 *    responses:
 *      '201':
 *          description: Created Success
 *      '500':
 *          description: Internal server error
 * 
 * @swagger
 * /developer/:id:
 *  put:
 *    description: Insert a developer
 *    parameters:
 *     - in: body
 *       name: fullName
 *       type: string
 *       description: Full name of the developer
 *     - in: body
 *       name: cellphone
 *       type: string
 *       description: Contact number
 *     - in: body
 *       name: cep
 *       type: integer
 *       description: CEP of the developer
 *     - in: body
 *       name: phone
 *       type: string
 *       description: Contact phone
 *     - in: body
 *       name: specialties
 *       type: array
 *       items: 
 *        type: string
 *       description: Specialties of the developer
 *     - in: body
 *       name: cep
 *       type: string
 *       description: CEP of the developer
 *    responses:
 *      '201':
 *          description: Created Success
 *      '500':
 *          description: Internal server error
 * 
 * @swagger
 * /developer/:id:
 *  delete:
 *    description: Exclude a developer
 *    responses:
 *      '200':
 *          description: Delete Success
 *      '500':
 *          description: Internal server error
 * 
 * @swagger
 * /developer/fullname/:fullname:
 *  get:
 *    description: Find a developer by full name
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 * 
 * @swagger
 * /developer/cellphone/:cellphone:
 *  get:
 *    description: Find a developer by cellphone
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 * 
 * @swagger
 * /developer/cep/:cep:
 *  get:
 *    description: Find a developer by cep
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 * 
 * @swagger
 * /developer/speciality/:speciality:
 *  get:
 *    description: Find a developer by speciality
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 */

app.use('/developer', developerRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
