const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
var swaggerJsdoc = require('swagger-jsdoc');
var swaggerUi = require("swagger-ui-express");
var config = require('./middleware/config');
var cors = require('cors');
var app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN;

var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: 'Recruitment DOC',
    version: '4.0.0',
    description: 'Recruitment',
    contact: {
      name: "Ardi Suryana",
      url: "https://swagger.io",
      email: "ardisuryana115@gmail.com"
    }
  },
  servers: [
    {
      url: config.hostlocal
    }
  ],
  host: config.hostlocal,
  basePath: '/',
  components: {
  securitySchemes: {
    APIKey: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    }
  },
}
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
express()
  .get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // .use(cors())
  .use(allowCrossDomain)
  .use(bodyParser.json({limit: '50mb'}))
  .use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use('/', require('./routes/Users'))
  .use('/', require('./routes/Shopping'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
