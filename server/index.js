const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const passport = require('passport');
require('dotenv').config();
require('./auth.js')

const app = express();

app.use(cors());
app.use(upload.array())
app.use(session({secret:"rohan",resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));
mongoose.connect(process.env.DB_STRING, 
    { useNewUrlParser: true,
     useUnifiedTopology: true,
    }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email','openid'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/');
    });