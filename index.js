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
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Development server',
      },
    ],
  },
  apis: ['index.js', 'routes/developer.js'],
};

const openapiSpecification = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(express.json());

// Routes
/**
 * @swagger
 *
 *
 * /developer:
 *  get:
 *    summary: Get a list with all developers
 *    description: Return a list(array) of objects with developers info
 *    responses:
 *       200:
 *         description: A list of developers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique id of the developer
 *                         example: 1
 *                       fullName:
 *                         type: string
 *                         description: Full name of the developer
 *                         example: Gabriel Gonçalves
 *                       cellphone:
 *                         type: string
 *                         description: Cellphone number of the developer
 *                         example: (99) 9999-9999
 *                       phone:
 *                         type: string
 *                         description: Phone number of the developer (opcional)
 *                         example: (55) 5555-5555
 *                       specialties:
 *                         type: string
 *                         description: List of specialties of the developer
 *                         example: Java, PHP, Javascript
 *                       cep:
 *                         type: string
 *                         description: CEP of the developer
 *                         example: 75256800
 *                       street:
 *                         type: string
 *                         description: Street of the developer
 *                         example: Rua dos Alfeneiros
 *                       neighborhood:
 *                         type: string
 *                         description: Neighborhood of the developer
 *                         example: Centro
 *                       city:
 *                         type: string
 *                         description: City of the developer
 *                         example: Belo Horizonte
 *                       state:
 *                         type: string
 *                         description: State of the developer
 *                         example: MG
 */

/**
 * @swagger
 * /developer:
 *  post:
 *    summary: Create a new developer
 *    parameters:
 *      - name: fullName
 *        description: Full name of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: Gabriel Gonçalves
 *      - name: cellphone
 *        description: Cellphone number of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: (99) 9999-9999
 *      - name: phone
 *        description: Phone number of the developer (opcional)
 *        in: body
 *        required: false
 *        type: string
 *        example: (55) 5555-5555
 *      - name: specialties
 *        description: List of specialties of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: Java, PHP, Javascript
 *      - name: cep
 *        description: CEP of the developer
 *        in: body
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: A new developer created.
 *        content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                      description: Unique id of the developer
 *                      example: 1
 *                    fullName:
 *                      type: string
 *                      description: Full name of the developer
 *                      example: Gabriel Gonçalves
 *                    cellphone:
 *                      type: string
 *                      description: Cellphone number of the developer
 *                      example: (99) 9999-9999
 *                    phone:
 *                      type: string
 *                      description: Phone number of the developer (opcional)
 *                      example: (55) 5555-5555
 *                    specialties:
 *                      type: string
 *                      description: List of specialties of the developer
 *                      example: Java, PHP, Javascript
 *                    cep:
 *                      type: string
 *                      description: CEP of the developer
 *                      example: 75256800
 *                    street:
 *                      type: string
 *                      description: Street of the developer
 *                      example: Rua dos Alfeneiros
 *                    neighborhood:
 *                      type: string
 *                      description: Neighborhood of the developer
 *                      example: Centro
 *                    city:
 *                      type: string
 *                      description: City of the developer
 *                      example: Belo Horizonte
 *                    state:
 *                      type: string
 *                      description: State of the developer
 *                      example: MG
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /developer/{id}:
 *  put:
 *    description: Insert a developer
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Numeric ID of the developer to update.
 *        schema:
 *          type: integer
 *        example: 1
 *      - name: fullName
 *        description: Full name of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: Gabriel Gonçalves
 *      - name: cellphone
 *        description: Cellphone number of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: (99) 9999-9999
 *      - name: phone
 *        description: Phone number of the developer (opcional)
 *        in: body
 *        required: false
 *        type: string
 *        example: (55) 5555-5555
 *      - name: specialties
 *        description: List of specialties of the developer
 *        in: body
 *        required: true
 *        type: string
 *        example: Java, PHP, Javascript
 *      - name: cep
 *        description: CEP of the developer
 *        in: body
 *        required: true
 *        type: string
 *    responses:
 *      '201':
 *          description: Created Success
 *      '500':
 *          description: Internal server error
 */

/**
 * @swagger
 * /developer/{id}:
 *  delete:
 *    description: Exclude a developer
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Numeric ID of the developer to update.
 *        schema:
 *          type: integer
 *        example: 1
 *    responses:
 *      '200':
 *          description: Delete Success
 *      '404':
 *          description: Developer not found
 *      '500':
 *          description: Internal server error
 *
 * @swagger
 * /developer/fullname/{fullname}:
 *  get:
 *    description: Find a developer by full name
 *    parameters:
 *      - name: fullname
 *        in: path
 *        required: true
 *        description: FullName of the developer to update.
 *        schema:
 *          type: string
 *        example: Gabriel Gonçalves
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 *
 * @swagger
 * /developer/cellphone/{cellphone}:
 *  get:
 *    description: Find a developer by cellphone
 *    parameters:
 *      - name: cellphone
 *        in: path
 *        required: true
 *        description: Cellphone of the developer to update.
 *        schema:
 *          type: string
 *        example: 62981556457
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 *
 * @swagger
 * /developer/cep/{cep}:
 *  get:
 *    description: Find a developer by cep
 *    parameters:
 *      - name: cep
 *        in: path
 *        required: true
 *        description: Cep of the developer to update.
 *        schema:
 *          type: string
 *        example: 75380457
 *    responses:
 *      '200':
 *          description: Find Success
 *      '500':
 *          description: Internal server error
 *      '404':
 *          description: Developer Not found
 *
 * @swagger
 * /developer/speciality/{speciality}:
 *  get:
 *    description: Find a developer by speciality
 *    parameters:
 *      - name: speciality
 *        in: path
 *        required: true
 *        description: Speciality of the developer to update.
 *        schema:
 *          type: string
 *        example: Java
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

app.get('/', function (req, res) {
  res
    .status(200)
    .send(
      'Bem vindo a API developer, consulte o endpoint /api-docs para ver a documentação',
    );
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
