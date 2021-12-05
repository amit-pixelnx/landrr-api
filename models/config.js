const mongo = require('mongoose');
let hostName = require('os').hostname();

let LOCAL_DB_URL = "mongodb://localhost:27017/hollywoodSecrets"
// let LIVE_DB_URL = "mongodb+srv://HollywoodSecretUser:HollywoodSecretUser@cluster0.rke6p.mongodb.net/HollywoodSecret"
let LIVE_DB_URL = "mongodb+srv://amit-pixelnx:amit.soni@123@cluster0.q7fri.mongodb.net/landrr?retryWrites=true&w=majority"

mongo.connect( ['PradumanTiwari' , 'localhost'].includes(hostName)?LIVE_DB_URL:LIVE_DB_URL , {
    useUnifiedTopology : true , 
    useNewUrlParser: true
} , (error) => {
    if(error){
        console.log(error);
    }else{
        console.log('MongDB Atlas Connected successfully.');
    } 
});