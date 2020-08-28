require('dotenv').config();
const cors         = require('cors');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const app          = express();
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);


mongoose
  .connect('mongodb://localhost/Techie', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

//const app_name = require('./package.json').name;
//const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
app.use(
    session({
      secret: 'my-secret-weapon',
      saveUninitialized: true,
      resave: true,
      cookie: {
        maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        //time to live (in seconds)
        ttl: 60 * 60 * 24,
        autoRemove: 'disabled',
      }),
    })
  );




app.use(cors({
  credentials: true, 
  origin: ['http://localhost:3000']
}))

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));




// default value for title local
// app.locals.title = 'Express - Generated with IronGenerator';

//Register routes

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes);


app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
