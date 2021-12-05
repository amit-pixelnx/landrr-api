
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
const path = require('path');


var s3 = new aws.S3({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: process.env.region,
    // 'x-amz-acl' : 'public-read'
} )

module.exports = {
    uploadFile :  (params) => {
        let upload = multer({
            storage: multerS3({
                s3: s3,
                acl: 'public-read',
                bucket: params.bucket,
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: file.fieldname});
                },
                key: function (req, file, cb) {
                    let ext = path.extname(file.originalname)
                    let folderName  = params.folder;
            
                    cb(null, folderName+Date.now().toString()+ext)
                },
            })
        }).any()

        return upload;
    },
    removeFile : (params , cb) => { 
        
        if(params.isMultiple){
            let obs = [];
            params.filePath.map((d, i) => {
                let fileLocation = d.split(params.bucket+'/')[1]
                obs.push({
                    Key : fileLocation
                });
            });
            
            s3.deleteObjects({
                Bucket: params.bucket,
                Delete: {
                    Quiet: false,
                    Objects: obs
                }
            },function (err,data){
                cb(err,data)
            })
            
        }else if(!params.isMultiple){//single delete
            let fileLocation = params.filePath.split(params.bucket+'/')[1]
            s3.deleteObject({
                Bucket: params.bucket,
                Key: fileLocation
            },function (err,data){
                cb(err,data)
            })
        }else{
            
            console.log(typeof params.filePath); return;
        }
        
        
    },
    s3 : s3
} 



/*
//  const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname)
//         console.log(file.originalname , ext);
//         const uniqueSuffix = Date.now() + ext
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage })


*/