const collectionModel = require("../models/Collection");
const mongoose = require("mongoose");
const citationModel = require("../models/citation");
const adherentModel = require("../models/adherent");

exports.showCollections = function (req, res, next) {
    collectionModel.find({ adherent: req.params.userid })
        .populate('citations', 'textcitation')
        .exec()
        .then(results => {
            if (results.length < 1) {
                return res.status(200).json({ message: 'there are no collections u can create one  ' });
            }
            else {
                return res.status(200).json({ results });

            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'error show didn\'t work', error: err });
        })
}


exports.addCollection = async function (req, res, next) {
    console.log(req.params);
    console.log(req.body.namecollection);
    const adherent = await adherentModel.findById(req.params.userid);
    const collection = new collectionModel({
        _id: new mongoose.Types.ObjectId(),
        namecollection: req.body.namecollection,
        citations: [],
        adherent: adherent
    });
    collection.save()
        .then(result => {
            if (result) {

                adherentModel.findOneAndUpdate({ _id: result.adherent._id }, { $push: { Collections: result } })
                    .exec()
                    .then(update => {
                        if (update) {
                            return res.status(201).json({
                                message: 'Collection Created successfully', request: {
                                    method: 'POST',
                                    URL: ''
                                }, result: result
                            })
                        }
                        else
                            return res.status(401).json({ message: 'failure' });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'error occured', error: err });
                    });

            }

            else
                return res.status(401).json({ message: ' a problem has occured check it out ' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'there is an error check your code', error: err })
        })
}





exports.getOneCollection = function (req, res, next) {
    collectionModel.findById(req.params.idCollection)
        .populate('citations', 'textcitation nameCitation')
        .exec()
        .then(collection => {
            if (!collection) {
                return res.status(404).json({ message: 'collection not found' });
            }
            else
                return res.status(200).json({ message: 'collection found ', collection: collection })
        })
        .catch(err => {
            return res.status(500).json({ message: 'error', error: err });
        })

}


exports.deleteCollection = function (req, res, next) {
    collectionModel.findOneAndDelete({_id:req.params.idCollection})
        .exec()
        .then(result => {
            if (result) {
                console.log(result);
                adherentModel.findByIdAndUpdate(result.adherent, { $pull: { Collections: result._id } })
                    .exec()
                    .then(result => {
                        if (result) {
                            return res.status(200).json({ message: 'ok update done', result });
                        }
                        else {
                            return res.status(401).json({ message: 'update error in the array' });
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'error occured', error: err })
                    })
            }
            else
                return res.status(401).json({ message: 'update error' });
        })
        .catch(err => { return res.status(500).json({ message: 'error occured', error: err }) });







}

exports.RemoveQuoteFromCollection = function (req, res, next) {
    citationModel.findOne({ textcitation: req.body.textcitation })
        .exec()
        .then(citation => {
            if (citation) {
                collectionModel.findByIdAndUpdate(req.params.idCollection, { $pull: { citations: citation._id } })
                    .exec()
                    .then(result => {
                        if (result) {
                            return res.status(200).json({ message: 'update done', result })
                        }
                        else
                            return res.status(401).json({ message: 'update failed' })
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'error occured' });
                    })
            }
            else
                return res.status(401).json({ message: 'error occured ' });
        })

        .catch(err => {
            return res.status(500).json({ message: 'error occured ' })
        })
}



exports.UpdateCollection = function (req, res, next) {
    console.log(req.params.idCollection)
    collectionModel.findByIdAndUpdate(req.params.idCollection, { '$set': { namecollection: req.body.namecollection } })
        .exec()
        .then(result => {
            if (!result) {
                console.log(result);
                return res.status(401).json({ message: 'update failed' })

            }
            else
                return res.status(200).json({ message: 'update done ', result })
        })
        .catch(err => {
            return res.status(500).json({ message: 'error has occurred', error: err })
        })

}



exports.AddQuoteToCollection = function (req, res, next) {

    citationModel.findOne({ textcitation: req.body.textcitation })
        .exec()
        .then(citation => {
            if (citation) {
                if (citation.Collection !== null) {
                    return res.status(401).json({ message: 'citation exists' });
                }
                else {
                    console.log(typeof(citation));
                    collectionModel.findByIdAndUpdate(req.params.idCollection, { $push:{ citations: citation } })
                        .exec()
                        .then(Collection => {
                            if (Collection) {
                                citationModel.findOneAndUpdate({ textcitation: req.body.textcitation }, { $set: { Collection: Collection } })
                                    .exec()
                                    .then(result => {
                                        if (result) {
                                            return res.status(200).json({ message: 'add Quote Done', result });
                                        }
                                        else
                                            return res.status(401).json({ message: 'failed' });

                                    })
                                    .catch(err => {
                                        return res.status(500).json({ message: 'error occured', err })
                                    })


                            }
                            else {
                                return res.status(401).json({ message: 'failed' });

                            }

                        })
                        .catch(err => { return res.status(500).json({ message: 'error occured', err }) })

                }

            }
            else
                return res.status(401).json({ message: 'failed', err });

        })
        .catch(

            err => {
                return res.status(500).json({ message: 'error occured' })
            })











}
