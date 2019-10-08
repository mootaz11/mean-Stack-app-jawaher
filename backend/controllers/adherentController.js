const multer = require("multer");
const bcrypt = require("bcrypt");
const nodemailer = require ("nodemailer");
const AdherentModel=require('../models/adherent');
const jwt = require("jsonwebtoken");
const checkAuth=require("../middlewares/check-authentication");
const mongoose=require("mongoose");
const favorisModel = require("../models/favoris");
const fs = require('fs');



exports.Login_Adherent= function(req,res,next){
    AdherentModel.findOne({email:req.body.email}).exec()
.then(user=>{
    if(!user){
        return res.json({message:'عذرًا، لا نتعرف على هذا البريد الإلكتروني.',status:"401"});
    }
    console.log(user)
    if(!user.isVerified)
    {
        return res.json({message:"عذرًا، لا نتعرف على هذا البريد الإلكتروني.",status:'401'})
    }
    else {
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
            if(err){
                console.log(result);
                return res.status(401).json({message:'login failed'});
            }
            if(result===false)
            {   console.log(req.body.password);
                return res.status(401).json({message:'password incorrect'})

            }
            if(result){
              const token = jwt.sign(
                    {
                    email:user.email,
                    userId:user._id
                },"secret",
                {expiresIn:"2h"},)
                return res.status(200).json({status:"200",message:'done',user,token:token});
            }
        })
    }
})  
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err})
})
}








exports.add_Adherent = function (req,res,next){
        
     console.log(req.body);
     console.log(req.file);
     AdherentModel.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length>=1){
            res.status(409).json({message:'mail exists'});
        }
        else {
            bcrypt.hash(req.body.password,10, async (err,hash)=>
            {
                if (err){
                    return res.status(500).json({error:err})
                }
                else {

                     let  favoris=new favorisModel({
                         _id: new mongoose.Types.ObjectId(),
                         citations:[]
                     });
                       
                        favoris.save();  
                        const adherent = new AdherentModel({
                       _id: new mongoose.Types.ObjectId(),
                       nom : req.body.nom ,
                       prenom : req.body.prenom,
                       pays: req.body.pays,
                       profession: req.body.profession,
                       naissance: req.body.naissance,
                       numtel:req.body.numTel,
                       email: req.body.email,
                       password:hash,
                       AdherentImage:req.file.path,
                       favoris:favoris

                   
                    });
                    console.log(adherent);

                   await favorisModel.findByIdAndUpdate(favoris._id,{'$set':{adherent:adherent}});


                   const transporter = nodemailer.createTransport({
                    service: 'gmail',secure:false,    requireTLS: true,
        
                    auth: {
                      user: 'amaramootaz11@gmail.com',
                      pass: '25417290'
                    }
                  });

                  const mailOptions = {
                    from: 'amaramootaz11@gmail.com',
                    to: req.body.email,
                    subject: ' jawaherkouloub account confirmation : ',
                    text: 'please confirm your account by clicking this link below',
                    html:'<a href="http://localhost:4200/#/account/loginConfirm/'+adherent._id+"\">"+"verify me </a>"
        
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error)
                    } else {
                      console.log('Email has been sent successfully');
                  
                    }
        
                  });
                   adherent.save().then(result=>{
                       console.log(result)
                           res.status(201).json({message:'adherent Created',adherent})
                   }).catch(err=>{
                    console.log(err)
                       res.status(500).json({error:err});

                   })
       
                }
            });
       }
    })
    .catch()
} 

exports.check_profile_user = function (req,res,next){
AdherentModel.findById(req.params.UserId)
.exec()
.then(user=>{
    if(!user){
        return res.status(404).json({message:'user not found'});
    }
    else{
        return res.status(200).json({user});
    }

})
.catch(err=>{
    console.log(err);
    res.status(500).json({error:err});
})
}


exports.UpdateInformation=function(req,res,next){

AdherentModel.update({_id:req.params.UserId},{'$set':{email:req.body.Adherent.email,profession:req.body.Adherent.profession,numtel:req.body.Adherent.numTel}})
.exec()
.then(result=>{
    if(result){
    return res.status(200).json({message : 'user updated'});}
    else 
    return res.status(401).json({message:'update failed'})
})
.catch(err=>{
    console.log(err);
    return res.status(500).json({error:err});
})
}

exports.Loginconfirm=function(req,res,next){
    AdherentModel.findOne({email:req.body.email})
    .exec()
    .then(user=>{
        if(!user){
            console.log(user.email);
            res.status(401).json({message:'email not found'})
        }
        else {
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){
                    
                    return res.status(401).json({message:'login failed'});
                }

                if(result===false){
                    return res.status(401).json({message:'password incorrect'});
                }
                else{
                    AdherentModel.findOneAndUpdate({email:req.body.email},{'$set':{isVerified:true}})
                    .exec()
                    .then(result=>{
                            const token = jwt.sign(
                            {email:user.email,
                            userId:user._id},"secret",{expiresIn:"2h"},)
                        
                            return res.status(200).json({message:'done',result,token:token});
                  
                        })
                    .catch(err=>{
                        return res.status(401).json({error:err});
                    })
                }

            })
        }
    })
    .catch(err=>{
        return res.status(401).json({error:err});
    })
}
exports.updatePicture=function(req,res,next){


AdherentModel.findById(req.params.UserId)
.exec()
.then(adherent=>{
    if(adherent){
        console.log(req.file.path);
        AdherentModel.findByIdAndUpdate(req.params.UserId,{$set:{AdherentImage:req.file.path}})
        .exec()
        .then(result=>{
            if(result){
                path="C:\\Users\\pc\\Desktop\\JawaherProject\\backend\\"+adherent.AdherentImage;
                

                fs.unlink(path,(err)=>{
                    if(err) throw err ;
                })
                console.log(result);
            return res.status(200).json({result})    
                }

            else {
                return res.status(401).json({message:'update failed'})
            }
        })
        .catch(err=>{
            return res.status(500).json({message:'error occured',err});
        })
    }
    else {
        return res.status(401).json({message:'update failed'});
    }
})
.catch(err=>{
    return res.status(500).json({message:'error occured',err})})




}

exports.changePassword=function(req,res,next){

AdherentModel.findById(req.params.UserId)
.exec()
.then(adherent=>{
    if(adherent){
        bcrypt.compare(req.body.oldPass,adherent.password,(err,result)=>{

            if(err){
                return res.status(401).json({message:'error occured'});
            }
            if(result===false){
                return res.json({message:'password incorrect'});
            }
            else 

            {
                bcrypt.hash(req.body.newPassword,10,(err,encrypted)=>{
                    if(err){
                        return res.status(500).json({err})
                    }
                    if(!encrypted){
                        return res.status(401).json({message:'update failed'});
                    }

                    else {

                        AdherentModel.findByIdAndUpdate(req.params.UserId,{$set:{password:encrypted}})
                        .exec()
                        .then(result=>{
                            if(result){
                                return res.status(200).json({message:'change done'});
                            }
                            else 
                            {
                                return res.status(401).json({message:'change failed'});
           
                            }
           
                        })
                        .catch(err=>{
                            return res.status(500).json({message:'error occured'});
           
                        })



                    }


                }
                )
                
                
                
                
                
             
        
        
        }


        })



    }
})
.catch(err=>{return res.status(500).json({message:'error occured'})})






}