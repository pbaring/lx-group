// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const reverseWords = require('./routes/api/reverse-word');
const sortWords = require('./routes/api/sort-words');
const incomeTax = require('./routes/api/income-tax');
const preIncomeTax = require('./routes/api/pre-income-tax');

// defining the Express app
const app = express();

const PORT = process.env.PORT || 3001;

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));



//endpoint
//reverseword
app.use('/api/reverse-words', reverseWords);

//sorted word
app.use('/api/sort-words', sortWords);

//income tax
app.use('/api/calculate-after-tax-income', incomeTax);

//pre income tax
app.use('/api/calculate-pre-tax-income-from-take-home', preIncomeTax);


app.get('/', (req, res)=>{
  res.send("Welcome to LX Group Technical Challenge");
});

// starting the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});