const http = require('http');
const express = require('express');
const app = express();
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


// const Task = require('./models/Task');
let tasks = require('./routes/tasks');
let users = require('./routes/users');
app.use("/images",express.static(path.join('images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
// app.post('/api/tasks', (req,res,next)=>{
//     console.log(req.body);
//     const task = new Task({
//         title: req.body.title,
//         description: req.body.description
//     });
//     task.save();
//     console.log(task);

//     res.status(201).json({
//         status:{
//             message: "Successs",
//             code: 201
//         },
//         data:task
//     })
// })

// app.put('/api/tasks/:id', (req, res, next)=>{
//     const task = new Task({
//         _id: req.body._id, 
//         title: req.body.title,
//         description: req.body.description
//     });
//     console.log(task);
//     Task.updateOne({_id:req.body._id}, task)
//     .then(()=>{
//         res.json({
//             status:{
//                 message: "Api successfully updated",
//                 code: 201
//             },
//             data:task
//         });
//     });
// });
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request with, Content-type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, PATCH");
    next();
});


// app.use to allow every request like post,get,put,patch, delete and options and app.get allow only get request
// app.get('/api/tasks', (req, res, next)=>{
//     Task.find()
//         .then(tasks=>{
//             res.json({
//                 status:{
//                     message: "Api successfully added",
        
//                     code: 200
//                 },
//                 data:tasks
//             });
//         });
//     // res.jstatus().json({
    
// });

// app.get('/api/tasks/:id', (req, res, next)=>{
//     Task.findById(req.params.id)
//         .then(tasks=>{
//             res.json({
//                 status:{
//                     message: "Api successfully added",
        
//                     code: 200
//                 },
//                 data:tasks
//             });
//         });
//     // res.jstatus().json({
    
// });


// app.delete('/api/tasks:id', (req, res, next)=>{
//  Task.deleteOne({_id:req.params.id})
//  .then(()=>{
//     res.json({
//         status:{
//             message: "Deleted Succesfully",
//             code: 201
//         }
//     })
//  })
// });
app.use('/api/tasks/',tasks);
app.use('/api/users/', users);
app.listen(port, () => {
    console.log('Listening on port: ', port);
});



// app.use((req, res, next)=>{
//     console.log("First Midddleware");
//     next();
// })
// app.use((req, res, next)=>{
//     console.log("Second Middlewaree");
//     res.send("Hello from Express!!!");
// })
// const server = http.createServer(app);
// server.on('error', (err)=>{
//     console.log("Error in server", err.message, err);
// })
// server.on('listening', ()=>{
//     console.log("I am listening port",port);
// })

// server.listen(port);