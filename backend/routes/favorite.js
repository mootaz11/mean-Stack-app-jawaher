const route=require("express").Router()
const FavoriteController=require("../controllers/FavoriteController");








//done
route.get('/:userid/showFav',FavoriteController.show_Favorite);
route.patch('/:userid/removeFromFav',FavoriteController.removeQuoteFromFavorite);


module.exports=route;