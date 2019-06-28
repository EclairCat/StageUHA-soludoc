//Imports
var db = require("../db");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


module.exports = {

    //Ajoute un Rdv
    addRdv: function (req, res) {
        //Params
        var idM = req.body.id_medecin;
        var idC = req.body.id_client;
        var date = req.body.date;


        var sql = 'INSERT INTO `t_rdv` ( id_medecin, id_client, date_rdv) VALUES ("' + idM + '","' + idC + '","' + date + '")';


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {
                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query AddRDV");
                        console.log(error.message);
                        res.status(500).send("Error in query");

                    }
                    else {
                        console.log("Success query AddRdv");
                        res.status(200).json();
                    }
                });
            }
        });
    },

    //Modifie la date du Rdv
    editRdv: function (req, res) {
        //Params
        var id_rdv = req.body.id_rdv;
        var date = req.body.date;


        var sql = 'UPDATE `t_rdv` SET date_rdv = "' + date + '" WHERE t_rdv.id_rdv = ' + id_rdv;


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {
                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query AddRDV");
                        console.log(error.message);
                        res.status(500).send("Error in query");

                    }
                    else {
                        console.log("Success query AddRdv");
                        res.status(200).json();
                    }
                });
            }
        });
    },

    //Suprime un Rdv
    deleteRdv: function (req, res) {
        //Params
        var idRdv = req.body.id_rdv;


        var sql = 'DELETE FROM t_rdv WHERE id_rdv = ' + idRdv;


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {

                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query DeleteRDV");
                        console.log(error.message);
                        res.status(500).send("Error in query");

                    }
                    else {
                        console.log("Success query DeleteRdv");
                        res.status(200).json();
                    }
                });
            }
        });
    },

    //Renvoie les rendez vous du Medecin
    getRdvMedecin: function (req, res) {
        //Params

        var token = req.params.id_medecin;
        var idM = jwt.decode(token);
        var sql = "SELECT * FROM `t_rdv` WHERE id_medecin = " + idM.subject;


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
                            console.log("error in query GetRdvMedecin");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query GetRdvMedecin");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },

    //Renvoie les Rendez vous du Client
    getRdvClient: function (req, res) {
        //Params
        var token = req.params.id_client;
        var idC = jwt.decode(token);
        var sql = "SELECT * FROM `t_rdv` WHERE id_client = " + idC.subject;


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
                            console.log("error in query GetRdvClient");
                            console.log(error.message);
                            res.status(500).send("Error in query");

                        }
                        else {
                            console.log("Success query GetRdvClient");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    },

    //rend la confirmation du rdv en confirmer
    confirmRdv: function (req, res) {
        id_rdv = req.body.id_rdv;

        sql = 'UPDATE `t_rdv` SET confirmation = "Confirmer"  WHERE t_rdv.id_rdv = ' + id_rdv;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {
                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query confirmRdv");
                        console.log(error.message);
                        res.status(500).send("Error in query");

                    }
                    else {
                        console.log("Success query Confirm Rdv");
                        res.status(200).json();
                    }
                });
            }
        });

    },

    //rend la confirmation du rdv en refuser
    denieRdv: function (req, res){
        id_rdv = req.body.id_rdv;

        sql = 'UPDATE `t_rdv` SET confirmation = "Refuser"  WHERE t_rdv.id_rdv = ' + id_rdv;

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                req.status(500).send("Error connection to database");
            }
            else {
                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query AddRDV");
                        console.log(error.message);
                        res.status(500).send("Error in query");

                    }
                    else {
                        console.log("Success query denieRdv");
                        res.status(200).json();
                    }
                });
            }
        });

    }


}