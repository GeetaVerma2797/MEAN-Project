const Task = require('../../models/Task');

module.exports = {
    updateTask: (req, res, next)=>{
        const url = req.protocol + "://" + req.get("host");
        let imagePath = req.body.imagePath;
        console.log("req.file  :::: ", req.file, req.body)
        if(req.file){
            console.log("geeta");
            imagePath = url + '/images/' + req.file.filename;
        }
        console.log("verma");
        console.log(req.file);
        const task = new Task({
            _id: req.body._id, 
            title: req.body.title,
            description: req.body.description,
            imagePath: imagePath
        });
        console.log(task);
        Task.updateOne({_id:req.body._id, creator: req.userData.userId}, task)
        .then((result)=>{
            console.log(result);
            // if(result.modifiedCount > 0){
                if(result){
                    res.json({
                    status:{
                        message: "Api successfully updated",
                        code: 201
                    },
                    data:task
                });
            }
            else{
                res.status(401).json({
                    status:{
                        message: "Auth Failed",
                        code: 401
                    },
                    data:task
                });
            }
            
        }).catch(e=>{
            res.status(500).json({
                status: {
                    message: e.message,
                    code: 500
                }
            });
        });
    }
}