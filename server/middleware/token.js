const jwt = require('jsonwebtoken')


exports.createAccessToken = (payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
exports.createRefreshToken = (payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})
}