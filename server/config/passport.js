const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require("./dbConfig");


//Passport Serialization
passport.serializeUser((user, done)=>{
    done(null, user.id);
})