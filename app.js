const express = require('express');
const session =  require('express-session');
const  hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();

mongoose.connect("mongoose://localhost:27017/node-auth-yt",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
   username :  {
       type: String,
       required: true
   },
   password : {
      type: String,
      required: true 
   } 
});


const User = mongoose.model('User', UserSchema);
//middleware
app.engine('hbs',hbs({ extname:'.hbs' }));
app.set('view engine' , 'hbs');
app.use(express.static(__dirname + '+public'));
app.use(session({
    secret: "loginSecret",
    resave :false,
    saveUninitialized : true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user,done){
done(null,user.id)
});

passport.deserializeUser(function (id, done){
    User.findById(id ,function (err,user){
        done(err, user);
    });
});

passport.use(new localStrategy(function (username,passwod,done){
    
}))