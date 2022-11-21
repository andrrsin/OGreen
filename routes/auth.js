const router= require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
     try {
        //Encrypting password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //finish encrypting password

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    });

//LOGIN
router.post('/login', async (req, res) => {
    try {
    const user = await User.findOne({ email: req.body.email});
    !user && res.status(404).json("Wrong password or username"  );

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    !validPassword && res.status(400).json("Wrong password or username");

    res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }

    
});


module.exports = router;