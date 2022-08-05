const Task = require('../../models/Task');

module.exports = {
    deleteTask: (req, res, next)=>{
        console.log('delete request is coming here');

        Task.deleteOne({_id:req.params.id, creator: req.userData.userId})
        .then((result)=>{
            console.log(result);
            if(result.deletedCount > 0){
                res.json({
                    status:{
                        message: "Deleted successfully",
                        code: 201
                    }
                });
            }
            else{
                res.status(401).json({
                    status:{
                        message: "Auth Failed",
                        code: 401
                    }
                });
            }
        }
        ).catch(e=>{
            res.status(500).json({
                status: {
                    message: e.message,
                    code: 500
                }
            });
        });
       }
}