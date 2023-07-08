const User = require('../models/user');

const profile = async (req, res) =>{
    if(req.cookies.user_id){
        try{
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        }catch(err){
            return res.status(500).json({ error: 'Internal Server Error!' });
        }
    }else{
        return res.redirect('/users/sign-in');
    }
}

// render sign up page 
const signUp = (req, res) => {
    res.render('user_sign_up', {
        title: 'Sign Up', 
        user:null
    });
}

// render sign in page
const signIn = async (req, res) => {
    if(req.cookies.user_id){
        try{
            const user = await User.findById(req.cookies.user_id);
            if(user){
                return res.render('user_profile', {
                    title: 'User Profile',
                    user: user
                });
            }else{
                return res.redirect('/users/sign-in');
            }
        }catch(err){
            return res.status(500).json({ error: 'Internal Server Error!' });
        }
    }else{
        res.render('user_sign_in', {
            title: 'Sign In',
            user:null
        });
    }
}

// get the data from sign up page
const create = async (req, res)=>{
    // if passwords don't match
    if(req.body.password!=req.body.confirm_password){
        return res.send(`<script>alert('Both passwords should be same.'); window.history.back();</script>`);
    }
    try{
        const user = await User.findOne({ email: req.body.email }).exec();
        if(!user){
            try{
                const newUser = await User.create(req.body);
                return res.status(201).redirect('/users/sign-in');
            }catch(err){
                console.log('Error while creating the user!', err);
            }
        }else{
            // if user is already present
            return res.send(`<script>alert('User already exists!'); window.history.back();</script>`);
        }
    }catch(err){
        console.log('Error in finding the user while signing up', err);
        return res.status(500).json({ error: 'Internal Server Error! '});
    }
    
}

// create user session after sign in
const createSession = async (req , res)=>{
    try{
        // find the user
        const user = await User.findOne({ email: req.body.email });
        if(user){
            // check for the password
            if(req.body.password == user.password){
                // storing session details in cookies
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }else{
                return res.send(`<script>alert('Incorrect Password!'); window.history.back();</script>`);
            }
        }else{
            return res.send(`<script>alert('No Such User found!'); window.history.back();</script>`);
        }
    }catch(err){
        console.log('Error in finding the user while signing in', err);
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
}

// sign out
const destroySession = (req, res) => {
    try{
        res.clearCookie('user_id');
        return res.redirect('/users/sign-in');
    }catch(err){
        return res.status(500).json({ error: 'Internal Server Error!' });
    }
}

module.exports = {
    profile,
    signUp,
    signIn,
    create,
    createSession,
    destroySession
}


