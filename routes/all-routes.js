const express = require('express')
const router = express.Router()
var moment = require('moment'); 
const User = require('../models/modelSchema');
const userController = require('../controllers/userController')

//  Get Request
router.get('/', userController.user_index_get)

router.get('/user/add.html',userController.user_add_get)


router.get('/user/view.html',userController.user_view_get)

router.get('/user/search.html',userController.user_search_get)


router.get('/view/:id',userController.user_view_one_get)

router.get('/edit/:id',userController.user_edit_get)

router.get('/search/:id',userController.user_search_one_get)


//  Post Request
router.post('/user/add.html', userController.user_add_post)

router.post('/search',userController.user_search_post)


//  Update Request
router.put('/edit/:id',userController.user_update);


//  Delete Request
router.delete("/edit/:id",userController.user_delete);


module.exports = router;