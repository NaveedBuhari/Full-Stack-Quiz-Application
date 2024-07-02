const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mainRoute = require('./MainRoute');

const app = express();
const PORT = process.env.PORT || 5007;
app.use(bodyParser.json());
app.use(cors());
app.use('/',mainRoute);
app.listen(PORT,()=>{console.log("Server listening to PORT: ",PORT);});

