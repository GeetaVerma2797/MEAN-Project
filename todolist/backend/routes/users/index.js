const express = require('express');
const router = express.Router({mergeParams:true});
// image code 



//including get put post delete  files 
let post = require('./post');


router.post('/login', post.login);
router.post('/signup', post.signup);


module.exports = router;