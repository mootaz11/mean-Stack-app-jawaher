const mongoose = require("mongoose");
const citationModel = require("../models/citation");


exports.getAllCitations = function (req, res, next) {
    citationModel.find()
        .exec()
        .then(citations => {
            if (citations.length < 1) {
                return res.status(404).json({ message: 'citations not found' })
            }
            else
                return res.status(200).json({ message: 'citations found', citations });
        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured', error: err })
        })



}



exports.addCitation = function (req, res, next) {

    citationModel.findOne({ textcitation: req.body.textcitation })
        .exec()
        .then(result => {
            if (result) {
                return res.status(401).json({ message: 'citation exists u can\t add' });
            }
            else {
                const tabPaths = []
                console.log(req.files, '\n');
                for (const val of req.files) {
                    console.log(val.path);
                    tabPaths.push(val.path);
                }
                console.log(tabPaths);
                const citation = new citationModel({
                    _id: new mongoose.Types.ObjectId(),
                    nameCitation: req.body.nameCitation,
                    textcitation: req.body.textcitation,
                    citationBackImages:tabPaths,
                    Collection:null


                });
                citation.save()
                    .then(result => {
                        if (result) {
                            return res.status(201).json({ message: 'done citation Created', citation: citation })
                        }
                        else
                            return res.status(401).json({ message: 'error creation failed' });
                    })
                    .catch(err => {
                        return res.status(500).json({ message: 'code error', error: err });
                    })
            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'code error', error: err });
        })



}



exports.checkCitation = function (req, res, next) {
    citationModel.findById(req.params.idCitation)
        .exec()
        .then(citation => {
            if (!citation) {
                return res.status(404).json({ message: 'Citation Not Found' });

            }
            else {
                return res.status(200).json({ message: 'citation exsits done', citation })
            }
        })
        .catch(err => {

            return res.status(500).json({ message: 'error occured', error: err })
        })






}

/*
exports.UpdateCitation = function (req, res, next) {
    citationModel.findByIdAndUpdate(req.params.idCitation, { '$set': {} })
        .exec()
        .then(result => {
            if (!result) {
                return res.status(401).json({ message: 'update error' });
            }
            else {
                return res.status(200).json({ message: 'update done' });
            }
        })
        .catch(err => {
            return res.status(500).json({ message: 'error occured', error: err });
        })
}
*/

