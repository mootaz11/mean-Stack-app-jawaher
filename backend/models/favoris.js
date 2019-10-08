const mongoose = require("mongoose");
const Schema = mongoose.Schema
const citation = require("../models/citation").schema;
const favorisSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    citations:[{type:Schema.ObjectId,ref:'citation'}],
    adherent:{type:Schema.ObjectId,ref:'adherent'}
});
const favorisModel=mongoose.model('favoris',favorisSchema);
module.exports=favorisModel;
