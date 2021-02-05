var express = require('express');
var router = express.Router();
let usersController= require('../controller/usersController');
const multer = require('multer');
const path =require('path');
let loginMiddleware = require('../middlewares/loginMiddleware');
const {check,validationResult,body}= require('express-validator')


const storage = multer.diskStorage(
	{
		destination: (req,file,cb)=>{ 

            cb(null,path.resolve(__dirname,'..','avatar'))},
		filename:  (req,file,cb)=>{ 
            let filename=file.originalname.substr(0,file.originalname.indexOf('.'))+'-' +Date.now() + path.extname(file.originalname)
            cb(null,filename)}
	}
)
const upload = multer({storage:storage})


/* GET admin page*/
router.get('/', loginMiddleware,usersController.adminUser);

/* GET user profile page*/
router.get('/profile/:id', loginMiddleware,usersController.userProfile);
 
/* GET user profile page*/
router.get('/profile/edit/:id',loginMiddleware, usersController.userEdit);


router.put('/profile/edit/:id',upload.any(), usersController.update);

/* GET register page. */
router.get('/register', usersController.getRegister);
router.post('/register',[
	check('username').notEmpty().withMessage('Debes escribir tu nombre de usuario'),
	check('first_name').notEmpty().withMessage('Debes escribir tu nombre'),
	check('last_name').notEmpty().withMessage('Debes escribir tu apellido'),
	check('email').isEmail().withMessage('Debes escribir tu email correctamente'),
	check('password').isLength({min:6}).withMessage('Recuerda que debes escribir minimamente 6 caracteres')


] ,usersController.registerUser);

/* GET login page. */
router.get('/login', usersController.getLogin);
router.post('/login',usersController.logInUser );
router.get('/logout',loginMiddleware, usersController.logOutUser);

module.exports = router;
