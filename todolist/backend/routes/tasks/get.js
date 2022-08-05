const Task = require('../../models/Task');

module.exports = {
    getById: (req, res, next)=>{
        Task.findById(req.params.id)
            .then(tasks=>{
                res.json({
                    status:{
                        message: "Api successfully added",
            
                        code: 200
                    },
                    data:tasks
                });
            }).catch(e=>{
                res.status(500).json({
                    status: {
                        message: e.message,
                        code: 500
                    }
                });
            });
        },
        getAll: (req, res, next)=>{
            // pagination
            console.log("geeta", req.query);
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.currentpage;

            const taskQuery = Task.find();
            if(pageSize && (currentPage > -1)){
                console.log("inside cgetaall")
                taskQuery
                .skip( pageSize * currentPage )
                .limit( pageSize );
            }

            taskQuery
                .then(async tasks=>{
                    res.json({
                        status:{
                            message: "Api successfully added",
                
                            code: 200
                        },
                        data:tasks,
                        totalCount: await Task.count()
                    });
                }).catch(e=>{
                    res.status(500).json({
                        status: {
                            message: e.message,
                            code: 500
                        }
                    });
                });
            // res.jstatus().json({
            
        }
}