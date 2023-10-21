const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const Router = require('./router/post');
const db = require('./mongodb/mongodb');
const app = express();
const port = 4000;
//kết nối db
db.connect();

// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/api',Router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})