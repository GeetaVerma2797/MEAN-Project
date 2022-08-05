const mongoose = require("mongoose");

const smsSchema = mongoose.Schema({
    phone: { type:String, require:true },
    name: { type:String},
    otp: { type:Number},
    smsBody: { type:String, defailt:"Hi Your Otp is: 123456" },
}, { timestamps: true });

module.exports = mongoose.model('Sms', smsSchema);