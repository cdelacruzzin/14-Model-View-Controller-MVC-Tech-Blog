const path = require('path');
const express = require('express');     //imports express.js, which simplifies the process of building APIs for routing, middleware configuration,
const session = require('express-session');     // imports 'express-session' middleware. It is used for amanaging user sessions. Sessions store specific data to a user
const exphbs = require('express-handlebars'); //imports express handlebars. handlebars is a view engine which allows you to render data to html templates
const routes = require('./controllers'); // a controller responsible for handling incoming http requests and sending back responses
const helpers = require('./utils/helpers'); //imports helper functions

const sequelize = require('./config/connection');   //imports a instance of sequelize that connection.js sets up and exports, and is connected to the database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = process.env || 3001;

const hbs = exphbs.create({helpers});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(port, () => console.log('Now listening'));
});