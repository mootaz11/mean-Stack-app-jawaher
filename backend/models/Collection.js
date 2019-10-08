const mongoose = require("mongoose");

const CollectionSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    namecollection:{type:String,required:true},
    citations:[{type:mongoose.Schema.ObjectId,ref:'citation'}]
    ,adherent:{type:mongoose.Schema.ObjectId,ref:'adherent'}
});

const Collection = mongoose.model('Collection',CollectionSchema);


module.exports= Collection;