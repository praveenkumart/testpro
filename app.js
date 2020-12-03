const express = require('express')
const app = express()
const port = 3000
const models = require('./models')
const users = require('./modules/users/routes')
const newsletter = require('./modules/newsletter/routes')
const bodyParser = require("body-parser");
const multer = require('multer');
const csv = require('fast-csv');

const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 



app.use('/users', users)
app.use('/newsletter', newsletter)
app.get('/',  function (req, res) {
  res.status(200)
})

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: "10240mb" }));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})