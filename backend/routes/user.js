const express = require("express");
const UserRoute = express.Router();
const checkAuth = require("../middlewares/check-authentication");
const AdherentController = require("../controllers/adherentController");
const upload  = require("../config/multerConfigUsers");



UserRoute.get('/',(req, res)=>{res.send('home page for users');});
UserRoute.get('/:UserId',AdherentController.check_profile_user);
UserRoute.post('/login',AdherentController.Login_Adherent);
UserRoute.post('/signup',upload.single('AdherentImage'),AdherentController.add_Adherent);
UserRoute.post('/loginconfirm',AdherentController.Loginconfirm);
UserRoute.patch('/:UserId',AdherentController.UpdateInformation);
UserRoute.patch('/updatepic/:UserId',upload.single('AdherentImage'),AdherentController.updatePicture);
UserRoute.patch('/changePassword/:UserId',AdherentController.changePassword);
module.exports = UserRoute;
