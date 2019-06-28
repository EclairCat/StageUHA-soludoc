//Imports
var db = require("../db");
var hashPassword = require("../passwordHash");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//Variable
var medecinKeyToken = "medecinKey"; //clé token secret Medecin

//Fonctions Routes
module.exports = {

    //Recupère tout les Medecins
    getAllMedecin: function (req, res) {
        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection in getAllMedecin (medecinController)");
                req.status(500).send("Error connection to database");
            }
            else {
                db.query('SELECT * FROM `t_medecin`',
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("Error in query in getAllMedecin (medecinController)");
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query in getAllMedecin");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },

    //Cherche le medecin en fonction de son Token
    getMedecinByToken: function (req, res) {
        //Params      
        var token = req.params.token;
        var id = jwt.decode(token);

        var sql = 'SELECT * FROM `t_medecin` WHERE id = ' + id.subject;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection in getMedecin (medecinController)");
                req.status(500).send('error connection to database');
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        // tempCo.release();
                        if (!!error) {
                            console.log("Error in query in getMedecin (medecinController)");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query in getMedecin");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    }, 

    //Cherche le medecin en fonction de son ID
    getMedecinById: function (req, res) {
        //Params      
        var id = req.params.id;

        var sql = 'SELECT * FROM `t_medecin` WHERE id = ' + id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection in getMedecin (medecinController)");
                req.status(500).send('error connection to database');
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        // tempCo.release();
                        if (!!error) {
                            console.log("Error in query in getMedecin (medecinController)");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query in getMedecin");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },   

    //Inscription
    addMedecin: function (req, res) {

        //Params
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var email = req.body.email;
        var mdp = req.body.mdp; //<= A crypter
        var tel = req.body.tel;
        var specialites = req.body.specialite;
        var adress = req.body.adress;
        var ville = req.body.ville;
        var cabtel = req.body.cabtel;
        var sql = 'INSERT INTO t_medecin (email, mdp, nom, prenom, tel, specialite, cabinet_tel, adresse, ville) VALUES ';

        //Cryptage du password
        hashPassword(mdp, function (err, mdpHashed) {
            if (err) {
                console.log("Error in HashPassword in AddMedecin (medecin controller)");
                console.log(err);
                req.status(500).send("Error from the server");
            }
            else {
                if (nom != null && prenom != null && email != null && mdpHashed != null && tel != null && adress != null && cabtel != null) {
                    sql = sql + '("' + email + '","' + mdpHashed + '","' + nom + '","' + prenom + '","' + tel + '","' +specialites+'","'+ cabtel + '","' + adress + '","'+ville+'")';
                }

                db.getConnection(function (err, tempCo) {
                    if (!!err) {
                        console.log("error in connection in AddMedecin (medecinController)");
                        req.send(500).send('error connection to database');
                    }
                    else {
                        db.query(sql, function (error, rows, fields) {
                            tempCo.release();
                            if (!!error) {
                                console.log("error in query in AddMedecin (medecinController)");
                                console.log(error.message);
                                res.status("500").json();
                            }
                            else {
                                console.log("Success query in AddMedecin");


                                //Recherche de l'id du medecin inscrit pour lui envoyer un Token
                                sqlgetId = 'SELECT id from t_medecin WHERE email = "'+email+'"';

                                db.query(sqlgetId, function (error, rows, fields) {
                                    if(error)
                                    {   
                                        console.log("Error query in sqlgetId, in addMedecin (medecinController)")
                                        console.log(error);
                                        res.status(500).send("Error : account created but impossible to get id, please log in");
                                    }
                                    else{
                                        let payload = {
                                            subject : rows[0].id
                                        };
                                        let token = jwt.sign(payload, medecinKeyToken);
                                        res.status(200).json(token);
                                    }                                    
                                });   
                            }
                        });
                    }
                });
            }
        });
    }, 

    //Modif Profil
    editMedecin: function (req, res) {

        //Params
        var email = req.body.email;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var adress = req.body.adress;
        var tel = req.body.tel;
        var specialites = req.body.specialite;
        var cabTel = req.body.cabTel;
        var mdp = req.body.mdp; 
        var urlimg = req.body.urlimg;
        var bio_profil = req.body.bio_profil;


        var sql = 'UPDATE t_medecin ';
        var id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("Error in connection");
                req.status(500).send("Error Connection to database");
            }
            else {
                //Recherche de l'id en fonction du mail
                db.query('SELECT id FROM `t_medecin` WHERE email ="' + email + '"',
                    function (error, rows, fields) {
                        if (!!error) {
                            console.log("error in query in EditMedecin (Medecin controller)");
                            res.status(500).send('Error in query');
                        }
                        else {
                            console.log("Success query recherche id");
                            id = rows[0].id;

                            //Modification UN PAR UN

                            //Nom
                            if (nom != null && nom != "") {
                                db.query(sql + 'SET nom = "' + nom + '" WHERE t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("Error in query Nom in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");

                                        }
                                        else {
                                            console.log("Success query Nom in EditMedecin");
                                            res.status(200)
                                        }
                                    });
                            }
                            //Prenom
                            if (prenom != null && prenom != "") {
                                db.query(sql + 'SET prenom = "' + prenom + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Prenom in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query Prenom in EditMedecin");
                                            res.status(200)
                                        }
                                    });
                            }
                            //Adresse
                            if (adress != null && adress != "") {
                                db.query(sql + 'SET adresse = "' + adress + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("Error in query Adress in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");

                                        }
                                        else {
                                            console.log("Success query Adress");
                                            res.status(200)
                                        }
                                    });
                            }
                            //Telephone
                            if (tel != null && tel != "") {
                                db.query(sql + 'SET tel = "' + tel + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Tel in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query Tel in EditMedecin");
                                            res.status(200)

                                        }
                                    });
                            }
                            //Specialite
                            if (specialites != null && specialites != "") {
                                db.query(sql + 'SET specialite = "' + specialites + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Specialite in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query Specialite in EditMedecin");
                                            res.status(200)

                                        }
                                    });
                            }
                            //Cabinet Tel
                            if (cabTel != null && cabTel != "") {
                                db.query(sql + 'SET cabinet_tel = "' + cabTel + '" where  t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query cabTel in EditMedecin");
                                            console.log(error.message);

                                            res.status(500).send("Error in query");
                                        }
                                        else {
                                            console.log("Success query cabTel in EditMedecin");
                                            res.status(200)
                                        }
                                    });
                            }                            
                            //Bio Profil
                            if (bio_profil != null && bio_profil != "") {
                                db.query(sql + 'SET bio_profil = "' + bio_profil + '" where t_medecin.id = ' + id,
                                    function (error, rows, fields) {
                                        if (!!error) {
                                            console.log("error in query Bio in EditMedecin");
                                            console.log(error.message);
                                            res.status(500).send("Error in query");

                                        }
                                        else {
                                            console.log("Success query Bio in EditMedecin");
                                            res.status(200)

                                        }
                                    });
                            }
                            //Mdp
                            if (mdp != null && mdp != "") {
                                //Cryptage
                                hashPassword(mdp, function (err, mdpHashed) {
                                    if (err) {
                                        console.log(err);
                                        req.status(500).send("Error in Server");
                                    }
                                    else {
                                        db.query(sql + 'SET mdp = "' + mdpHashed + '" where t_medecin.id = ' + id,
                                            function (error, rows, fields) {
                                                if (!!error) {
                                                    console.log("error in query Mdp in EditMedecin");
                                                    console.log(error.message);
                                                    res.status(500).send("Error in query");

                                                }
                                                else {
                                                    console.log("Success query Mdp in EditMedecin");
                                                    res.status(200)
                                                }
                                            });
                                    }
                                })
                            }
                            res.status(200).json();
                            tempCo.release();
                            //FIN DE LA MODIF
                        }
                    }
                );
            }
        });
    },

    //Suppression du compte
    deleteMedecin: function (req, res) {

        //Params
        var id = req.body.id;

        var sql = 'DELETE FROM t_medecin WHERE id = ' + id;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.send(500).send("Error connection to dataBase");
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
                            console.log("Success query, Delete Success");
                            res.status(200).json();
                        }
                    });
            }
        });
    },


    //Ajoute une specialite au medecin dans la table medecin has specialite
    addSpeToMed: function (req, res){
        token = req.params.token;
        id = jwt.decode(token);
        id = id.subject;
        //id = req.body.id_medecin; // Test PostMan
        nameSpe = req.params.speName;
        

        sqlGetIdSpe = 'SELECT id_specialite from t_specialite_enum WHERE nom_specialite = "'+nameSpe+'"';

        db.getConnection(function (err, tempCo){
            if(err){
                Console.log("Error Connection in addSpeToMed (medecinController.js)");
                tempCo.release();
            }
            else{
                db.query(sqlGetIdSpe, function (error, rows, fields){
                    if(error){
                        console.log("Error in query addSpeToMed (medecinController.js)");
                        console.log(error.message);
                        res.status(500).send("Error In Query");
                    }
                    else{
                        if(rows.length === 0)
                        {
                            console.log("no id_specialite found with name "+nameSpe);
                            res.status(404).send("no id_specialite found");
                        }
                        else{
                            idSpe = rows[0].id_specialite;
                            sqlAddSpeToM = 'INSERT INTO t_medecin_has_specialite (id_medecin, id_specialite) VALUES ('+id+','+idSpe+')';
                            db.query(sqlAddSpeToM, function (error, rows, fields){
                                if(error){
                                    console.log("Error in query addSpeToMed (medecinController.js)");
                                    console.log(error.message);
                                    res.status(500).send("Error In Query");
                                }
                                else{
                                    console.log("Success query (Ajout Specialite to Medecin)");
                                    res.status(200).send("Sucess Insert");
                                }
                            });
                        }
                    }
                });
            }
        
        });


    },

    
    //Connection en tant que Medecin
    login: function (req, res) {
        //Params
        var email = req.params.email;
        var mdp = req.params.mdp;
        var sql = "SELECT * FROM `t_medecin` WHERE email = '" + email + "'";


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.send(500).send("Error connection to dataBase");
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query in loginMedecin");
                            console.log(error.message);
                            req.status(500).send("error in query");
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
                                            let token = jwt.sign(payload, medecinKeyToken);
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
    }, 
}

