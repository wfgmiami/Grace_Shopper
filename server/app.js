const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser');
const db = require('./db')

app.use(bodyParser.json())
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api', router);


app.get('/',(req,res,next)=>{
  res.send(__dirname + '../dist/index.html');
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> `listening on port ${port}`)

db.seed();
