var express = require('express');
var router = express.Router({mergeParams:true});

let post = require('./post');
let get = require('./get')
//POST requests
router.post('/send-sms', post.sendSms);
router.get('/sms', get.fetchSms);


// console.log("rourte", router)
module.exports = router;

