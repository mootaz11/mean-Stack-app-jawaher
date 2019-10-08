const express=require("express");
const route = express.Router();
const CitationController = require('../controllers/CitationController');
const CollectionController=require('../controllers/CollectionController');
const upload=require("../config/multerConfigCitations");
const FavoriteController = require('../controllers/FavoriteController');



route.post('/',upload.array("citationBackImages"),CitationController.addCitation);

route.get('/:idCitation',CitationController.checkCitation);

route.get('/',CitationController.getAllCitations);






route.patch('/:idCollection/addQuotetoC',CollectionController.AddQuoteToCollection);
route.patch('/:idCollection/removeQuotFromC',CollectionController.RemoveQuoteFromCollection);





//done
route.patch('/:userid/addQuotetoF',FavoriteController.addQuoteToFavorite);

route.patch('/:userid/removeQuoteFromF',FavoriteController.removeQuoteFromFavorite);






module.exports=route;