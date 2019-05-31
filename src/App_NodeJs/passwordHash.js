//Import 
const bcrypt = require('bcrypt');
const saltRounds = 11;


module.exports = function (password, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return console.log(err)
        }
        else {
            bcrypt.hash(password, salt, function (err, passwordHashed) {
                if (err) {
                    return console.log(err);
                }
                else {
                    callback(null, passwordHashed);
                }
            })
        }
    });
};