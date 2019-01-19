const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,"my_jwt_secret_key_25696");
        next();
    } catch (error) {
        res.status(401).json({message:"Auth failed!"});
    }

}