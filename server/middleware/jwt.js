const jwt = require('jsonwebtoken');

function generateAccessToken(email) {
    try{
    return jwt.sign(
        { email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    
    );}catch(err){
        return null;
    }
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;

    if (token == null) return res.sendStatus(401)
    if(req.body.isAdmin) next();
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        console.log(err)

        if (err)
            return res.sendStatus(403).json("We are sorry you have an invalid token.");

        req.user = user

        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}