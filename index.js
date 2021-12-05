const connection = require('./models/config');
const express = require('express');
var cors = require('cors')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config(); //for access .env data

app.use(cors())
// app.use(bodyParser.urlencoded({
//     extended : false
// }));
// app.use(bodyParser.json());


app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))


const myRoutes = require('./routes/routes'); 
app.use('/' , myRoutes);




/****************** */

const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://17d240a3072e42fea21a637aecda3e8e@o1074886.ingest.sentry.io/6074836",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    // foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
/****************** */


app.listen(process.env.SERVER_PORT , () => {
    console.log('localhost:'+process.env.SERVER_PORT);
});