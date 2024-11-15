const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        let token = req.header('x-token')
        console.log(token)
        if (!token){
            return res.status(401).json({error:"Token not found"})
        }
        let decode = jwt.verify(token,'jwt-secret')
        req.user = decode.user
        next()
    }
    catch(err){
        return res.status(400).json({error:"Invalid token"})
    }
}