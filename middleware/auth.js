const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Orange';

function authenticateToken(req,res,next)
{
    const authHeader = req.headers('authorization');
    const token = authHeader && autheader.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({message: 'Access deniend. no token provided.'});
    }

    try 
    {
        const decoded = jwt.verify(token , JWT_SECRET);
        req.user = decoded
        next();
    } catch (error)
    {
        res.status(403).json({message : 'Invalid or expired token'});
    }

}

module.exports = authenticateToken;