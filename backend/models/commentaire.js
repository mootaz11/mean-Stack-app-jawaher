const mongoose = require("mongoose");

commentaireSchema =new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
comContent:{type:String},
citation:{type:mongoose.Schema.Types.ObjectId,ref:'citation'},
adherent:{type:mongoose.Schema.Types.ObjectId,ref:'adherent'},
reponse:String
}

);


const commentaireModel=mongoose.model('commentaire',commentaireSchema);



module.exports=commentaireModel;
