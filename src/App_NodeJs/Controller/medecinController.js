//Imports
var db = require("../db");
var hashPassword = require("../passwordHash");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Routes
module.exports = {

    //Recupère tout les Medecins
    getAllMedecin: function (req, res) {
        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {
                db.query('SELECT id, nom, prenom, tel, cabinet_tel, adresse, bio_profil, url_img FROM `t_medecin`',
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query");
                            res.json(rows);
                        }
                    });
            }
        });
    },

    //Cherche le medecin en fonction de son ID
    getMedecin: function (req, res) {
        //Params      
        var token = req.params.id;
        var id = jwt.decode(token);
        console.log(req.params);

        var sql = 'SELECT * FROM `t_medecin` WHERE id = ' + id.subject;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                // tempCo.release();
            }
            else {


                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        // tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            console.log("query : [ " + sql + " ]");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query");
                            res.json(rows);
                        }
                    });
            }
        });
    }, //Fonctionel   

    //Inscription
    addMedecin: function (req, res) {

        //Params
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var mdp = req.body.mdp; //<= A crypter
        var tel = req.body.tel;
        var adress = req.body.adress;
        var cabtel = req.body.cabtel;
        var sql = 'INSERT INTO t_medecin (email, mdp, nom, prenom, tel, cabinet_tel, adresse) VALUES ';

        //Cryptage
        hashPassword(mdp, function (err, mdpHashed) {
            if (err) {
                console.log(err);
            }
            else {

                if (nom != null && prenom != null && email != null && mdpHashed != null && tel != null && adress != null && cabtel != null) {
                    sql = sql + '("' + email + '","' + mdpHashed + '","' + nom + '","' + prenom + '","' + tel + '","' + cabtel + '","' + adress + '")';
                }

                console.log("sql= [" + sql + "]");


                db.getConnection(function (err, tempCo) {
                    if (!!err) {
                        console.log("error in connection");
                        tempCo.release();
                    }
                    else {
                        db.query(sql, function (error, rows, fields) {
                            tempCo.release();
                            if (!!error) {
                                console.log("error in query");
                                console.log(error);
                                res.status("500").json();

                            }
                            else {
                                console.log("Success query");
                                db.query('SELECT id from t_medecin WHERE email = "'+email+'"', function (error, rows, fields) {
                                    if(error)
                                    {
                                        console.log(error);
                                    }
                                    else{
                                        let payload = {
                                            subject : rows[0].id
                                        };
                                        let token = jwt.sign(payload, TokenKey);
                                        res.status(200).json(token);
                                    }                                    
                                });   
                            }
                        });
                    }
                });
            }
        });



    }, //Fonctionel

    //Modif Profil
    editMedecin: function (req, res) {

        //Params
        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var adress = req.body.adress;
        var tel = req.body.tel;
        var cabTel = req.body.cabTel;
        var mdp = req.body.mdp; // <= a crypter
        var urlimg = req.body.urlimg;
        var bio_profil = req.body.bio_profil;


        var sql = 'UPDATE t_medecin ';
        var id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {
                //Recherche de l'id en fonction du mail
                db.query('SELECT id FROM `t_medecin` WHERE email ="' + email + '"',
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query recherche id");
                            console.log("id = " + rows[0].id);
                            id = rows[0].id;

                            //MODIF UN PAR UN

                            //Nom
                            if (nom != null && nom != "") {
                                db.query(sql + 'SET nom = "' + nom + '" WHERE t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Nom");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query Nom");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Prenom
                            if (prenom != null && prenom != "") {
                                db.query(sql + 'SET prenom = "' + prenom + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Prenom");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query Prenom");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Adresse
                            if (adress != null && adress != "") {
                                db.query(sql + 'SET adresse = "' + adress + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Adress");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query Adress");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //telephone
                            if (tel != null && tel != "") {
                                db.query(sql + 'SET tel = "' + tel + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Tel");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query Tel");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Cabinet Tel
                            if (cabTel != null && cabTel != "") {
                                db.query(sql + 'SET cabinet_tel = "' + cabTel + '" where  t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query cabTel");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query cabTel");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Img Url
                            if (urlimg != null && urlimg != "") {
                                db.query(sql + 'SET url_img = "' + urlimg + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query ImgUrl");
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query ImgUrl");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Bio Profil
                            if (bio_profil != null && bio_profil != "") {
                                db.query(sql + 'SET bio_profil = "' + bio_profil + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Bio");
                                            console.log(error);
                                            res.status("500").json();

                                        }
                                        else {
                                            console.log("Success query Bio");
                                            res.status("200").json();

                                        }
                                    });
                            }
                            //Mdp
                            if (mdp != null && mdp != "") {
                                //Cryptage
                                hashPassword(mdp, function (err, mdpHashed) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        db.query(sql + 'SET mdp = "' + mdpHashed + '" where t_medecin.id = ' + id,
                                            function (error, rows, fields) {
                                                if (!!error) {
                                                    console.log("error in query Mdp");
                                                    res.status("500").json();

                                                }
                                                else {
                                                    console.log("Success query Mdp");
                                                    res.status("200").json();

                                                }
                                            });
                                    }
                                })
                            }
                            tempCo.release();
                            //FIN DE LA MODIF
                        }
                    }
                );
            }
        });
    }, //Fonctionnel

    //Suppression du compte
    deleteMedecin: function (req, res) {

        //Params
        var id = req.body.id;

        var sql = 'DELETE FROM t_medecin WHERE id = ' + id;

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
                            console.log("error in query");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query");
                            console.log("Delete Success");
                            res.status("200").json();
                        }
                    });
            }
        });
    }, //Fonctionel


    
    //Connection en tant que Medecin
    login: function (req, res) {
        //Params
        var email = req.params.email;
        var mdp = req.params.mdp;
        var sql = "SELECT * FROM `t_medecin` WHERE email = '" + email + "'";


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
                            console.log("error in query");
                            console.log("query : [ " + sql + " ]");
                        }
                        else {
                            console.log("Success query");
                            if(rows.length != 0)
                            {
                                bcrypt.compare(mdp, rows[0].mdp, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (!result) {
                                            res.status(401).send("Mdp Wrong");
                                        }
                                        else {
                                            let payload = {
                                                subject : rows[0].id
                                            };
                                            let token = jwt.sign(payload, TokenKey);
                                            res.status(200).json(token);
                                        }
                                    }
                                })
                            }
                            else{
                                res.status(401).send("email Wrong");
                            }                      
                        }
                    });
            }
        });
    }, //Fonctionel
}

