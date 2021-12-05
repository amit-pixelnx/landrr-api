const express = require('express');
const mongoos = require('mongoose');
const commonLib = require('../library/common');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const nodemailer = require("nodemailer");

const router = express.Router();

router.get('/login' , async (req , res) => {
    commonLib.customValidator({
        isToken : false,
        data : req.query,
        keys :  {
            email : {
                require : true,
                validate : 'email',
                type : ''
            },
            password : {
                require : true,
            }
        }
    }, 
    req ,
    res , 
    async (validateResp) => {
        
        await userModel.find({
            'email' : req.query.email
        }).limit(1).then(async result => {
            if(result.length > 0){
                let newPassword = commonLib.encrypt(req.query.password);

                if(newPassword == result[0].password){
                    setJwtAndResp(result , req , res , 'login');
                } else {
                    res.status(401).json({
                        ok : false,
                        message:'Invalid login credentials.'
                    })
                }
            } else {
                res.status(401).json({
                    ok : false,
                    message:'Invalid login credentials.'
                })
            }
        }).catch(err=>{
            res.status(401).json({
                ok : false,
                message :err
            })
        })
    });
    return false;
    
});

router.get('/login_admin_as_user' , async (req , res) => {
    commonLib.customValidator({
        data : req.query,
        keys :  {
            target : {
                require : true,
            },
        }
    }, 
    req ,
    res , 
    async (validateResp) => {
        
        await userModel.find({
            _id : req.query.target
        }).limit(1).then(async result => {
            setJwtAndResp(result , req , res , 'login_admin_as_user');
        }).catch(err=>{
            res.status(401).json({
                ok : false,
                message :err
            })
        })
    });
    return false;
    
});

router.get('/login_admin_as_admin' , async (req , res) => {
    commonLib.customValidator({
        data : req.query,
        keys :  {
            currentAdmin : {
                require : true,
            },
        }
    }, 
    req ,
    res , 
    async (validateResp) => {
        
        await userModel.find({
            _id : req.query.currentAdmin
        }).limit(1).then(async result => {
            setJwtAndResp(result , req , res, 'login_admin_as_admin');
        }).catch(err=>{
            res.status(401).json({
                ok : false,
                message :err
            })
        })
    }); 
    return false;
    
});

function setJwtAndResp(result , req , res , type){
    if(result.length > 0){

        if(req.query.hasOwnProperty('rememberMe') && req.query.rememberMe == true){
            res.cookie('email' , req.query.email);
            res.cookie('password', commonLib.encrypt(req.query.password));
        }

        
        var token = jwt.sign({
            id : result[0]._id,
            role : result[0].role
        }, process.env.TOKEN_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        let myResp = {
            ok : true,
            loggedIn : true,
            token : token,
            userId : result[0]._id,
            role : result[0].role,
            email : result[0].email,
            firstName : result[0].firstName,
            lastName : result[0].lastName,
            profilePic : result[0].profilePic,
        };

        if(type == 'login_admin_as_user'){
            myResp.adminAsAUser = req.query.currentAdmin
        }

        
        res.status(200).json({
            data : myResp,
            ok : true,
            message:'You are successfully logged in.'
        });
    } else {
        res.status(401).json({
            ok : false,
            message:'Invalid login credentials.'
        })
    }
}


router.post('/registration' , async (req , res) => {

    commonLib.customValidator({
        isToken : false,
        data : req.body,
        keys :  {
            firstName : {
                require : true,
            },
            lastName : {
                require : true,
            },
            email : {
                require : true,
                validate : 'email',
                type : ''
            },
            password : {
                require : true,
            },
        }
    }, 
    req ,
    res , 
    async (validateResp) => {
        if(req.body.password === req.body.confirmPassword){
            await userModel.find({
                'email' : req.body.email
            }).limit(1).then(async result => { 
    
                if(result.length > 0){
                    res.status(401).json({message:'Email is already with us. Please try with another email.'})
                } else {
                    let newUser = await userModel.create({
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        email : req.body.email,
                        password : commonLib.encrypt(req.body.password),
                    });
    
                    if(newUser){

                        create_sales_user({
                            target : newUser._id,
                            name : req.body.firstName+ ' '+req.body.lastName,
                            email : req.body.email
                        });

                        res.status(200).json({
                            message:'Registration completed successfully.',
                            ok : true
                        })
                    }else{
                        res.status(401).json({
                            ok : false,
                            message:'Invalid login credentials.'
                        })
                    }
                }
            }).catch( err=> {
                res.status(401).json({
                    ok : false,
                    message:err
                })
            })
        }else{
            res.status(401).json({
                ok : false,
                message:"Password and confirm password should be same."
            })
        }
    });
    
});

router.get('/torgot_password' , async (req , res) => {
    
    commonLib.customValidator({
        isToken : false,
        data : req.query,
        keys :  {
            email : {
                require : true,
                validate : 'email',
            }
        }
    }, 
    req ,
    res , 
    async (validateResp) => {
        await userModel.find({
            'email' : req.query.email,
        }).then(async result => { 

            if(result.length > 0){
                const transporter = nodemailer.createTransport({
                    host: 'mail.pixelnx.com',
                    port: 465,
                    auth: {
                        user: 'development@pixelnx.com',
                        pass: 'development@321#'
                    }
                });
                
                // send email
                let asd = await transporter.sendMail({
                    from: 'praduman.tiwari@himanshusofttech.com',
                    to: 'praduman.tiwari@pixelnx.com',
                    subject: 'Test Email Subject',
                    html: '<h1>Example HTML Message Body</h1>'
                });
                
                res.status(200).json({
                    ok : true,
                    message:'Eamil sent successfully.'
                })

            } else {
                res.status(401).json({
                    ok : false,
                    message:'Email is not with us.'
                })
            }
        }).catch( err=> {
            res.status(401).json({
                ok : false,
                'message':err,
                test : 456
            })
        })
    });
    
});

function create_sales_user(params){
    let tUrl = process.env.SALES_FACTORY_URL+`auth/create_new_user?target=${params.target}&name=${params.name}&email=${params.email}`
    var request = require('request');
    
    request({
        url: tUrl,
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }); 

    

}



module.exports = router;