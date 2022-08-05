const express = require('express');
const router = express.Router({mergeParams:true});
// image code 
const checkAuth = require("../../middleware/check-auth");
const fileUploadHandler = require("../../middleware/file-upload-handler")



//including get put post delete  files 
let get = require('./get');
let post = require('./post');
let put = require('./put');
let del = require('./delete');

router.get('/', get.getAll);
router.get('/:id', get.getById);
router.post('/', checkAuth, fileUploadHandler, post.createTask);
router.put('/:id', checkAuth, fileUploadHandler, put.updateTask);
router.delete('/:id', checkAuth, del.deleteTask);

module.exports = router;