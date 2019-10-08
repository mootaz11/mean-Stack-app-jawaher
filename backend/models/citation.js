const mongoose = require("mongoose");
const citationSchema = new mongoose.Schema({

    
    _id: mongoose.Schema.Types.ObjectId,
    nameCitation: { type: String, required: true },
    citationBackImages: { type: Array },
    textcitation: String,
    favoris: { type: mongoose.Schema.Types.ObjectId, ref: 'favoris' },
    Collection:{type:mongoose.Schema.Types.ObjectId,ref:'Collection'},
    commentaires:[{type:mongoose.Schema.Types.ObjectId,ref:'commentaire'}],
    nbLikes:Number,
    nbpartage:Number});
    

const citation = mongoose.model('citation', citationSchema);

module.exports = citation;
