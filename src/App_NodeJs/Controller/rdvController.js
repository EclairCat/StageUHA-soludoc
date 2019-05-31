//Imports
var db = require("../db");
var bcrypt = require("bcrypt");

module.exports = {

    addRdv: function (req, res) {
        //Params
        var idM = req.body.id_medecin;
        var idC = req.body.id_client;
        var date = req.body.date;


        var sql = 'INSERT INTO `t_rdv` ( id_medecin, id_client, date_rdv) VALUES ("' + idM + '","' + idC + '","' + date + '")';
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {

                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query AddRDV");
                        console.log(error);
                        res.status("500").json();

                    }
                    else {
                        console.log("Success query AddRdv");
                        res.status("200").json();

                    }
                });
            }
        });
    },

    editRdv: function (req, res) {
        //Params
        var id_rdv = req.body.id_rdv;
        var date = req.body.date;


        var sql = 'UPDATE `t_rdv` SET date_rdv = "' + date + '" WHERE t_rdv.id_rdv = ' + id_rdv;
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {

                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query AddRDV");
                        console.log("query : [ " + sql + " ]");
                        res.status("500").json();

                    }
                    else {
                        console.log("Success query AddRdv");
                        res.status("200").json();
                    }
                });
            }
        });
    },

    deleteRdv: function (req, res) {
        //Params
        var idRdv = req.body.id_rdv;


        var sql = 'DELETE FROM t_rdv WHERE id_rdv = ' + idRdv;
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
            }
            else {

                db.query(sql, function (error, rows, fields) {
                    tempCo.release();
                    if (!!error) {
                        console.log("error in query DeleteRDV");
                        console.log("query : [ " + sql + " ]");
                        res.status("500").json();

                    }
                    else {
                        console.log("Success query DeleteRdv");
                        res.status("200").json();

                    }
                });
            }
        });
    },


    getRdvMedecin: function (req, res) {
        //Params

        var token = req.params.id_medecin;
        var idM = jwt.decode(token);
        var sql = "SELECT * FROM `t_rdv` WHERE id_medecin = " + idM.subject;
        console.log(sql);


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
                            console.log("error in query GetRdvMedecin");
                            console.log("query : [ " + sql + " ]");
                            res.status(500).json();

                        }
                        else {
                            console.log("Success query GetRdvMedecin");
                            res.json(rows);
                        }
                    });
            }
        });
    },

    getRdvClient: function (req, res) {
        //Params
        var token = req.params.id_client;
        var idC = jwt.decode(token);
        var sql = "SELECT * FROM `t_rdv` WHERE id_client = " + idC.subject;
        console.log(sql);


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
                            console.log("error in query GetRdvClient");
                            console.log("query : [ " + sql + " ]");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query GetRdvClient");
                            res.json(rows);
                        }
                    });
            }
        });
    },


}