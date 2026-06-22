import Router = require("express");
import Express = require("express");

const { UserController } = require("./controllers/UserController");


const router = Express.Router();



router.post('/users', (req, res) => UserController.create(req, res));
router.get('/users', (req, res) => UserController.read(req, res));
router.put('/users', (req, res) => UserController.update(req, res));
router.delete('/users', (req, res) => UserController.delete(req, res));
	
	
	
export = router;