const jwt = require('jsonwebtoken');
require("dotenv-safe").config();


module.exports = {

    jwtCheckAdmin: function (req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            const admin = JSON.parse(Buffer.from(token.split('.')[1], "base64")).adm
            if (!admin) return res.status(500).json({ auth:false, message: 'Como você chegou aqui?' });

            //passou
            req.userId = decoded.id;
            next();
        });
    },

    jwtCheck: function (req, res, next){
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
            //passou
            req.userId = decoded.id;
            next();
        });
    }

}