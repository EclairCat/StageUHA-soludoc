//Imports
var db = require("../db");
var bcrypt = require("bcrypt");
var hashpassword = require("../passwordHash");
var jwt = require('jsonwebtoken');

//Variable
var clientKeyToken = "clientKey"; //clé Secrete pour le cryptage du token

//Fonctions Routes
module.exports = {

    //Revoie les infos du client
    getClientByToken: function (req, res) {
        //Params
        var token = req.params.token;
        var id = jwt.decode(token);
        var sql_GetClientTokent = "SELECT * FROM `t_client` WHERE id = " + id.subject;


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection in getClient");                
                res.status(500).send("Error Connection to database");
            }
            else {
                db.query(sql_GetClientTokent, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query GetClientByToken");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query GetClientByToken");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    }, 

     //Revoie les infos du client
     getClientById: function (req, res) {
        //Params
        var id = req.params.id;
        var sql = "SELECT id, email, nom, prenom, tel FROM `t_client` WHERE id = " + id;


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection in getClient");                
                res.status(500).send("Error Connection to database");
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query GetClientById");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query GetClientById");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    }, 

    //Inscription
    addClient: function (req, res) {

        //Params
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var mdp = req.body.mdp; //<= A crypter
        var tel = req.body.tel;

        var sql = 'INSERT INTO t_client (email, mdp, nom, prenom, tel) VALUES ';

        hashpassword(mdp, function (err, mdphashed) {
            if (err) {
                console.log(err);
                req.status(500).send("Error in Server");
            }
            else {
                if (nom != null && prenom != null && email != null && mdphashed != null && tel != null) {
                    sql = sql + '("' + email + '","' + mdphashed + '","' + nom + '","' + prenom + '","' + tel + '")';
                }

                db.getConnection(function (err, tempCo) {
                    if (!!err) {
                        console.log("error in connection");
                        tempCo.release();
                        res.status(500).send("Error connection to database");

                    }
                    else {
                        db.query(sql, function (error, rows, fields) {
                            tempCo.release();
                            if (!!error) {
                                console.log("error in query AddClient");
                                console.log(error.message);
                                res.status(500).send("Error in query");

                            }
                            else {
                                console.log("Success query AddClient");

                                db.query('SELECT id from t_client WHERE email = "'+email+'"', function (error, rows, fields) {
                                    if(error)
                                    {   
                                        console.log("Error in query searchId Addclient");
                                        console.log(error.message);
                                        res.status(500).send("Error in server : your account is created! please try to log in");

                                    }
                                    else{
                                        let payload = {
                                            subject : rows[0].id
                                        };
                                        let token = jwt.sign(payload, clientKeyToken);
                                        res.status(200).json(token);
                                    }                                    
                                });                               

                            }
                        });
                    }
                });
            }
        })


    },

    //Modif Profil
    editClient: function (req, res) {

        //Params
        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var tel = req.body.tel;
        var mdp = req.body.mdp; // <= a crypter


        var sql = 'UPDATE t_client ';
        var id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {

                //Recherche de l'id en fonction du mail
                db.query('SELECT id FROM `t_client` WHERE email ="' + email + '"',
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query SearchClientByID");
                            console.log(error.message);
                        }
                        else {
                            console.log("Success query SearchClientByID");
                            console.log("id = " + rows[0].id);
                            id = rows[0].id;

                            //MODIF UN PAR UN 

                            //Nom
                            if (nom != null && nom != "") {
                                db.query(sql + 'SET nom = "' + nom + '" where t_client.id = ' + id, //changer la requete
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Nom");
                                            console.log(error.message);
                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query Nom");
                                        }
                                    });
                            }
                            //Prenom
                            if (prenom != null && prenom != "") {
                                db.query(sql + 'SET prenom = "' + prenom + '" where t_client.id = ' + id, //changer la requete
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Prenom");
                                            console.log(error.message);
                                            res.status(500).send("Error in query");

                                        }
                                        else {
                                            console.log("Success query Prenom");

                                        }
                                    });
                            }
                            //telephone
                            if (tel != null && tel != "") {
                                db.query(sql + 'SET tel = "' + tel + '" where t_client.id = ' + id, //changer la requete
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Tel");
                                            console.log(error.message);
                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query Tel");

                                        }
                                    });
                            }
                            //Mdp
                            if (mdp != null && mdp != "") {

                                hashpassword(mdp, function (err, hashedmdp) {
                                    if (err) {
                                        console.log(err);
                                        req.status(500).send("error in server");
                                    }
                                    else {
                                        db.query(sql + 'SET mdp = "' + hashedmdp + '" where t_client.id = ' + id, //changer la requete
                                            function (error, rows, fields) {
                                                if (!!error) {
                                                    console.log("error in query mdp");
                                                    console.log(error.message);

                                                    res.status(500).send("Error in query");

                                                }
                                                else {
                                                    console.log("Success query mdp");

                                                }
                                            });
                                    }
                                })

                            }
                            //FIN MODIF 
                            res.status(200).json();
                        }
                    }
                );

            }
        });
    },

    //Suppression du compte
    deleteClient: function (req, res) {

        //Params
        var id = req.body.id;

        var sql = 'DELETE FROM t_client WHERE id = ' + id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query DeleteClient");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query | Delete Success");
                            res.status(200).send("Sucess Delete");

                        }
                    });
            }
        });
    },

    //Connecte le client
    login: function (req, res) {
        //Params
        var email = req.params.email;
        var mdp = req.params.mdp;

        
        var sql = "SELECT * FROM `t_client` WHERE email = '" + email + "'";


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {

                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query Login");
                            console.log(error.message);
                            req.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query Login");
                            if(rows.length != 0)
                            {
                                bcrypt.compare(mdp, rows[0].mdp, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (!result) {
                                            res.status(401).send('invalid mdp');
                                        }
                                        else {
                                            let payload = { subject : rows[0].id};
                                            let token = jwt.sign(payload, clientKeyToken);
                                            res.status(200).json(token);
                                        }
                                    }
                                })
                            }
                            else{
                                res.status(401).send('invalid email');
                            }
                        }
                    });
            }
        });
    }, 



}