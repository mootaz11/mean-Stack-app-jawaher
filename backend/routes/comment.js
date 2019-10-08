const route = require("express").Router();
const CommentaireController=require("../controllers/CommentaireController");



route.post('/:idcitation/addcomment',CommentaireController.addComment);
route.patch('/:idcomment/updatecomment',CommentaireController.updateComment);
route.get('/:idcitation/getAll',CommentaireController.getAllComments);
route.get('/:idcomment/getOneComment',CommentaireController.getOneComment);
route.delete('/:idcomment/deleteComment',CommentaireController.deleteOneComment);




module.exports=route;