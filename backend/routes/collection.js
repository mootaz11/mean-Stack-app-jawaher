const express = require("express");
const route = express.Router();
const CollectionController=require("../controllers/CollectionController");




route.get('/:userid/getAll',CollectionController.showCollections);
route.post('/:userid/addCollection',CollectionController.addCollection);
route.get('/:idCollection',CollectionController.getOneCollection);

route.delete('/:idCollection',CollectionController.deleteCollection);

route.patch('/:idCollection/updateCollection',CollectionController.UpdateCollection);
route.put('/:idCollection/removequote',CollectionController.RemoveQuoteFromCollection);




module.exports=route;


