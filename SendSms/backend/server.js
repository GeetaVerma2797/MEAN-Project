const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.set('port', port);
const path = require('path');


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URL)
.then(()=>{
    console.log("Connected Successfully");
})
.catch((err)=>{
    console.log("Problem in connect", err.message, err);
})





let details = require('./routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(cors());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request with, Content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, PATCH");
    next();
});


app.use('/api',details);
module.exports = app;
// console.log("routes geeta", app)
app.listen(port, () => {
    console.log('Listening on port: ', port);
});


