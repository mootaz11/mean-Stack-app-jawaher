const mongoose = require("mongoose");

const adherentSchema =  new mongoose.Schema
({
_id:mongoose.Schema.Types.ObjectId,
nom : {type : String,required: true},
prenom : {type : String ,required : true},
ville : {type : String }, 
pays : { type : String ,required:true},
profession : { type : String,required:true},
education :{type : String},
naissance : {type : Date , required:true},
numtel : {type : String},
email : {type : String,
        required : true,
        unique:true},
genre:String,
SiteWeb:String,
password : { type : String , required : true },
AdherentImage : {type :String,required:true},
isVerified:{type:Boolean,default:false},
interests:[String],
favoris:{type:mongoose.Schema.ObjectId,ref:'favoris'},
Collections:[{type:mongoose.Schema.ObjectId, ref:'Collection'}]
});

module.exports=mongoose.model('adherent',adherentSchema);