const connection = require('./models/config');
const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config(); //for access .env data

app.use(cors())
const authController = require('./controllers/auth'); 
const projectController = require('./controllers/user/project'); 
const videoController = require('./controllers/user/video'); 
const commonController = require('./controllers/common'); 
// const adminRouter = require('./controllers/admin/router'); 
const categoryRouter = require('./controllers/admin/category'); 
const userRouter = require('./controllers/admin/user'); 
const assetsRouter = require('./controllers/admin/assets'); 
const subscriptionRouter = require('./controllers/admin/subscription'); 
const trainingRouter = require('./controllers/admin/training'); 




// app.use(bodyParser.urlencoded({
//     extended : false
// }));
// app.use(bodyParser.json());


app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

app.use('/auth' , authController);
app.use('/user/project' , projectController);
app.use('/user/video' , videoController);
app.use('/common' , commonController);
app.use('/admin/category' , categoryRouter);
app.use('/admin/user' , userRouter);
app.use('/admin/assets' , assetsRouter);
app.use('/admin/subscription' , subscriptionRouter);
app.use('/admin/training' , trainingRouter);

 


app.listen(process.env.SERVER_PORT , () => {
    console.log('localhost:'+process.env.SERVER_PORT);
});