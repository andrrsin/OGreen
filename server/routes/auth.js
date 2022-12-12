const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

//REGISTER
router.post('/register', async (req, res) => {
    try {
        //Encrypting password
        if (req.body.password.length < 8) {
            return res.status(400).json("Password must be at least 8 characters long");
        }

        const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //finish encrypting password

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,

        });




        //save and respond
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json("Oops! Something went wrong...");
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        console.log("a")
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("Wrong password or username");
        console.log(user)
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password or username");



        const token = jwt.sign({ id: user._id}, process.env.TOKEN_KEY);


        user.token = token;

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }


});
router.post('/logout', async (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
})

module.exports = router;