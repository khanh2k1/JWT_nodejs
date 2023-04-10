const jwt = require('jsonwebtoken')


const middlewareController = {
    verifyToken : (req, res, next)=> {
        const token = req.cookie;
        if(token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, result)=>{
                if(error) {
                    res.status(403).json('Token is not valid !')
                }else {
                    // buggggggggg
                    req.account = result
                    next()
                }
            })
        }else {
            res.status(401).json("U aren't authenticated !")
        }
    },

    verifyTokenAndAdminAuth : (req, res, next) => {
        middlewareController.verifyToken(req, res, ()=>{
            console.log('==> ', req)
            if(req.account.id === req.params.id || req.account.isAdmin) {
                next()
            }else {
                res.status(403).json('U are not allow to delete')
            }
        })
    }
}

module.exports = middlewareController