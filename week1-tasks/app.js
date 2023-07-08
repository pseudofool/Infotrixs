const express = require('express');
const app = express();
const routes = require('./routes/app');
const connectDB = require('./db/connect');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));

// handling layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', routes);


const port = 3000 || process.env.PORT;

const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Connected to db and Server is running on port: ${port}`));
    }catch(err){
        console.log('Error', err);
    }
}

start();
