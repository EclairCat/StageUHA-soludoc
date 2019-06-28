//Imports
var db = require("../db");
var bcrypt = require("bcrypt");
var hashpassword = require('../passwordHash');

var jwt = require('jsonwebtoken');

var secretaireKeyToken = "secretaireKey";


module.exports = {

    //Inscription
    addSecretariat: function (req, res) {

        //Params
        var email = req.body.email;
        var mdp = req.body.mdp; //<= A crypter

        var token = req.body.id_medecin;
        var id_m = jwt.decode(token);

        
        var sql = 'INSERT INTO t_secretaire (email, mdp, id_medecin) VALUES ';


        if (email != null && mdp != null) {
            hashpassword(mdp, function (err, hashedMdp) {
                if (err) {
                    console.log("Error in connection");

                    console.log(err);
                    req.send(500).send("error in server");
                }
                else {
                    sql = sql + '("' + email + '","' + hashedMdp + '","' + id_m.subject + '")';
                    db.getConnection(function (err, tempCo) {
                        if (!!err) {
                            console.log("error in connection");                            
                            res.status(500).send("Error Connection to database");
                        }
                        else {
                            db.query(sql, function (error, rows, fields) {
                                tempCo.release();
                                if (!!error) {
                                    console.log("error in query AddSecretariat");
                                    console.log(error.message);
                                    res.status(500).send("Error in query");

                                }
                                else {
                                    console.log("Success query AddSecretariat");
                                    res.status(200).json();
                                }
                            });
                        }
                    });
                }

            });
        }


    },

    //Modif Profil
    editSecretariat: function (req, res) {

        //Params
        var email = req.body.email;
        var mdp = req.body.mdp; // <= a crypter


        var sql = 'UPDATE t_secretaire ';

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection");
                console.log(err);
                req.send(500).send("error in server");
            }
            else {
                //Mdp
                if (mdp != null && mdp != "") {
                    hashpassword(mdp, function (err, hashedMdp) {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Error in server");
                        }
                        else {
                            db.query(sql + 'SET mdp = "' + hashedMdp + '" WHERE email = "' + email + '"',
                                function (error, rows, fields) {
                                    if (!!error) {
                                        console.log("error in query mdp");
                                        console.log(error.message);
                                        res.status(500).send("Error in query");

                                    }
                                    else {
                                        console.log("Success query mdp");
                                        res.status(200).json();
                                    }
                                });
                        }

                    });

                }
                //FIN MODIF 
                tempCo.release();

            }
        });
    },

    //Suppression du compte
    deleteSecretariat: function (req, res) {

        //Params
        var id = req.body.id;

        var sql = 'DELETE FROM t_secretaire WHERE id = ' + id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection");
                console.log(err);
                req.send(500).send("error in server");

            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query DeleteSecretariat");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query | Delete Success");
                            res.status(200).send("Succes Delete");

                        }
                    });
            }
        });
    },

    //Login pour Secretaire
    login: function (req, res) {
        //Params
        var email = req.params.email;
        var mdp = req.params.mdp;
        var sql = 'SELECT * FROM `t_secretaire` WHERE email = "' + email + '"';


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection");
                console.log(err);
                req.send(500).send("error in server");
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query");
                            if (rows.length != 0) {
                                bcrypt.compare(mdp, rows[0].mdp, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        req.status(500).send("error in server");
                                    }
                                    else {
                                        if (!result) {
                                            console.log('invalid mdp');
                                            res.status(401).send("invalid mdp")
                                        }
                                        else {
                                            let payload = {
                                                subject: rows[0].id
                                            };
                                            let token = jwt.sign(payload, secretaireKeyToken);
                                            res.status(200).json(token);
                                        }
                                    }
                                })
                            }
                            else {
                                console.log('invalid email');
                                res.status(401).send("invalid Email")
                            }
                        }
                    });
            }
        });
    }, 


}