const mongoose = require("mongoose");
const favorisModel = require("../models/favoris");
const citationModel = require("../models/citation");
const adherentModel = require("../models/adherent");

exports.show_Favorite = function (req, res, next) {
    favorisModel.findOne({adherent:req.params.userid})
    .populate('citations','textcitation  nameCitation')
    .exec()
    .then(result=>{
        if (result){
            return res.status(200).json({message:'Favorite exist done ',result});
        }
        else 
            return res.status(404).json({message:'Favorite not found'});
    })
    .catch(err=>{
        return res.status(500).json({message:'error occured',err});
    })
}

exports.addQuoteToFavorite = function (req, res, next) {
    citationModel.findOne({ textcitation: req.body.textcitation })
        .exec()
        .then(result => {
            if (result) {
                favorisModel.findOneAndUpdate({adherent: req.params.userid},{$push:{citations:result}})
                    .exec()
                    .then(fav => {
                        if (fav) {
                            return res.status(200).json({ message: 'adding quote Done' });
                        }
                        else {
                            return res.status(401).json({ message: 'adding quote failed' });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'error occured', err });
                    })
            }
            else {
                return res.status(401).json({ message: 'adding quote failed up' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error occured 2', err })
        })


}
exports.removeQuoteFromFavorite = function (req, res, next) 
{

citationModel.findOne({textcitation:req.body.textcitation})
.exec()
.then(result=>{
    console.log(result);
    if(result){
        favorisModel.findOneAndUpdate({adherent:req.params.userid},{$pull:{citations:result_id}})
        .exec()
        .then(result=>{
            if (result){
                return res.status(200).json({message:'element has been removed',result});
            }
            else 
                return res.status(401).json({message:'element hasn\'t been removed'})
        })
        .catch(err=>{
            return res.status(500).json({message:'error occured',err});
        })

    }
    else 
        return res.status(401).json({message:'element hasn\'t been removed'});
})
.catch(err=>{
    return res.status(500).json({message:'error occured',err});
})
    
}