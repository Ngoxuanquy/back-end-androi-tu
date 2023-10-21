const passport = require("passport");
const LocalStratery = require("passport-local").Strategy;
const User = require("../models/User");
const JwtStratery = require("passport-jwt");
//xu li dang nhap
passport.use(
    new LocalStratery((username, password, done) =>{
        User.findOne({ username }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            user.comparePassword(passport,done);
        });
    })
);

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
};

passport.use(
    new JwtStratery({
        jwtFromRequest :cookieExtractor,
        secretOrkey: "vantam",
    },
    (payload,done)=>{
        User.findById({_id:payload.sub},(err,user)=>{
            if(err) return done(err,false);
            if(user) return done(err,null);
            else return done (null, false);
        })
    })
)