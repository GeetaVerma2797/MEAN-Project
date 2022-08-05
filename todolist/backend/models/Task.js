const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: { type:String, require:true },
    description: { type:String, defailt:"No Description" },
    imagePath: { type:String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true}
});

module.exports = mongoose.model('Task', taskSchema);