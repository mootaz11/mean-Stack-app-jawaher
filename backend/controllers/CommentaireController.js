const mongoose = require("mongoose");

const commentaireModel = require("../models/commentaire");

const citationModel = require("../models/citation");




exports.addComment = async function (req, res, next) {
    const citation = await citationModel.findById(req.params.idcitation);
    console.log(citation);
    const commentaire = new commentaireModel({
        _id: new mongoose.Types.ObjectId(),
        comContent: req.body.comContent,
        citation
    });
    commentaire.save()
        .then(result => {
            if (result) {
                console.log(result);
                citationModel.findByIdAndUpdate(req.params.idcitation, { $push: { commentaires: result } })
                    .exec()
                    .then(result => {
                        if (result) {
                            return res.status(201).json({ message: 'comment created successfully', result });
                        }
                        else
                            return res.status(401).json({ message: 'comment cannot be created ' }, result);
                    })
                    .catch(err => { return res.status(500).json({ message: 'error occured 1 ' }) })
            }
            else
                return res.status(401).json({ message: 'creation failed' });
        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured' });
        })

}




exports.updateComment = function (req, res, next) 
{   
    commentaireModel.findByIdAndUpdate(req.params.idcomment, { $set: { comContent: req.body.comContent } })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({ message: 'update done congrats' , result});
            }
            else
                res.status(401).json({ message: 'update failed' }, result);
        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured'});
        });

}




exports.getAllComments = function (req, res, next)
 {
    commentaireModel.find({ citation: req.params.idcitation })
        .exec()
        .then(comments => {
            if (comments.length >= 1) {
                return res.status(200).json({ message: 'comments found done', comments });
            }
            else
                return res.status(401).json({ message: 'comments not found ', comments });

        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured', err });
        });
}







exports.getOneComment = function (req, res, next) 
{
    commentaireModel.findById(req.params.idcomment)
    .exec()
    .then(comment=>{
        if(comment)
        {
           return res.status(200).json({message:'here s ur comment',comment});

        }
        else 
            res.status(401).json({message:'comment not found try again ',comment});
    })
    .catch(err=>{
        return res.status(500).json({message:'error occured',err});
    });
}
exports.deleteOneComment = function (req, res, next){


    commentaireModel.findByIdAndRemove(req.params.idcomment)
    .exec()
    .then(result => {
        if (result) {
            citationModel.findByIdAndUpdate(result.citation,{$pull:{commentaires:result._id}})
            .exec()
            .then(result=>{
                if(result){
                    res.status(200).json({ message: 'comment deleted congrats' , result});
                          }
                else
                    res.status(401).json({message:'delete failed',result});})

            .catch(err=>{return res.status(500).json({message:'error occured'})})
                    }
        else
            res.status(401).json({ message: 'delete failed' , result});
    })
    .catch(err => {
        return res.status(500).json({ message: 'error occured' });
    });


}







