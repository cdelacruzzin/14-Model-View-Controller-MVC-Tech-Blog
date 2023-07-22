const path = require('path');
const express = require('express');     //imports express.js, which simplifies the process of building APIs for routing, middleware configuration,
const session = require('express-session');     // imports 'express-session' middleware. It is used for amanaging user sessions. Sessions store specific data to a user
const exphbs = require('express-handlebars'); //imports express handlebars. handlebars is a view engine which allows you to render data to html templates
const routes = require('./controllers'); // a controller responsible for handling incoming http requests and sending back responses
const helpers = require('./utils/helpers'); //imports helper functions

const sequelize = require('./config/connection');   //imports a instance of sequelize that connection.js sets up and exports, and is connected to the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);     //imports 'connect-session-sequelize' module and calls it with 'session.Store'. It is used to store express session data to sql database, that can save sessions on server restart.

const app = express();
const port = process.env.PORT|| 3001;

const hbs = exphbs.create({helpers});   //uses .create to create a new instance of handlebars


const sess = {  
    secret: 'Super secret secret',
    cookie: {   //cookie setting;
      maxAge: 300000,   //the max time (is ms) until the cookie expires
      httpOnly: true,   //
      secure: false,    //set to false, so cookie will not be sent over HTTPS
      sameSite: 'strict',   //a measure to mitigate cross-site request forgery. set to strict, so 
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};
app.use(session(sess));     //adds the configured session as middleware to the express app.

app.engine('handlebars', hbs.engine);   //configures the engine that express will use. It is set to handlebars. (hbs.engine is a reference to the Handlebars template)
app.set('view engine', 'handlebars');   // will automatically add '.handlebars' to any file names when it tries to display web pages. so, if res.render is called without a file extension (res.render('all')), it will look for the 'all.handlebars' file.





app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));    //middleware to allow bootstrap to be accessible to public


app.use(routes);

sequelize.sync({ force: false}).then(() => {    //syncs sequelize to the database. {force: false} means that Sequelize won't make any changes to the tables if they already exist.
    //if true, it will drop and recreate the tables.
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
