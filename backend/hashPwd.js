const bcrypt = require('bcrypt');

module.exports = {
    hashPwd: function (password) {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {        
            if (err) { console.log(err) ; return "falha no hashing"}
            
            //passou
            return hash
        });
    },

    comparePwd: function(password, hash) {
        bcrypt.compare(password, hash, function(err, res) {
            if (err) { console.log(err) ; return "zuou o bcrypt"}

            return res            
        });
    }

}