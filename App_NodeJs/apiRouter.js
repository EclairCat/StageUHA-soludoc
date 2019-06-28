//Imports
var express = require('express');
var bodyParser = require('body-parser');
var apiRouter = express.Router();
var cors = require('cors');
var jwt = require('jsonwebtoken');

//Import Controller 
var medecinController = require('./Controller/medecinController');
var clientController = require('./Controller/clientController');
var rdvController = require('./Controller/rdvController');
var specialiteController = require('./Controller/specialiteController');
var secretaireController = require('./Controller/secretaireController');

//Secret Key de Token
var clientKeyToken = "clientKey";
var medecinKeyToken = "medecinKey";
var secretaireKeyToken = "secretaireKey";


//Fonction qui Verifie le Token d'un Client 
function verifyTokenClient(req, res, next) {
    if(!req.headers['authorization']){
        return res.status(401).send("Unothorize Request 1");
    }
    let token = req.headers['authorization'].split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unothorize Request 2");
    }
    try {
        let payload = jwt.verify(token, clientKeyToken);
        next();
        
    } catch (error) {
        return res.status(401).send("Unothorize Request 3");
    }   
    
}

//Fonction qui Verifie le Token d'un Medecin
function verifyTokenMedecin(req, res, next) {
    if(!req.headers['authorization']){
        return res.status(401).send("Unothorize Request 1");
    }
    let token = req.headers['authorization'].split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unothorize Request 2");
    }
    try {
        let payload = jwt.verify(token, medecinKeyToken);
        next();
        
    } catch (error) {
        return res.status(401).send("Unothorize Request 3");
    }   
    
}

//Fonction qui Verifie le Token d'un secretaire
function verifyTokenSecretaire(req, res, next) {
    if(!req.headers['authorization']){
        return res.status(401).send("Unothorize Request 1");
    }
    let token = req.headers['authorization'].split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unothorize Request 2");
    }
    try {
        let payload = jwt.verify(token, secretaireKeyToken);
        next();
        
    } catch (error) {
        return res.status(401).send("Unothorize Request 3");
    }   
    
}



// Router
exports.router = (function () {
    //Config api
    apiRouter.use(bodyParser());
    apiRouter.use(cors());
    
    //Medecin Routes
    apiRouter.route('/medecin/getAll').get(medecinController.getAllMedecin);
    apiRouter.route('/medecin/get/token/:token').get(verifyTokenMedecin, medecinController.getMedecinByToken);
    apiRouter.route('/medecin/get/:id').get(medecinController.getMedecinById);
    apiRouter.route('/medecin/add').post(medecinController.addMedecin);
    apiRouter.route('/medecin/edit').post(medecinController.editMedecin);
    apiRouter.route('/medecin/delete').post(medecinController.deleteMedecin);
    apiRouter.route('/medecin/login/:email/:mdp').get(medecinController.login);
    apiRouter.route('/medecin/add/specialite/:token/:speName').get(medecinController.addSpeToMed);

    //Client Routes
    apiRouter.route('/client/get/token/:token').get(verifyTokenClient, clientController.getClientByToken);
    apiRouter.route('/client/get/:id').get(clientController.getClientById);
    apiRouter.route('/client/add').post(clientController.addClient);
    apiRouter.route('/client/edit').post(clientController.editClient);
    apiRouter.route('/client/delete').post(clientController.deleteClient);
    apiRouter.route('/client/login/:email/:mdp').get(clientController.login);

    //Secretariat Routes
    apiRouter.route('/secretaire/add').post(secretaireController.addSecretariat);
    apiRouter.route('/secretaire/delete').post(secretaireController.deleteSecretariat);
    apiRouter.route('/secretaire/edit').post(secretaireController.editSecretariat);
    apiRouter.route('/secretaire/login/:email/:mdp').get(secretaireController.login);


    //Specialite Routes
    apiRouter.route('/specialite/get/:id').get(specialiteController.getSpe);
    apiRouter.route('/specialite/getAll').get(specialiteController.getAllSpe);

    //Rdv Routes
    apiRouter.route('/rdv/add').post(rdvController.addRdv);
    apiRouter.route('/rdv/delete').post(rdvController.deleteRdv);
    apiRouter.route('/rdv/edit').post(rdvController.editRdv);
    apiRouter.route('/rdv/getRdvMedecin/:id_medecin').get(verifyTokenMedecin, rdvController.getRdvMedecin);
    apiRouter.route('/rdv/getRdvClient/:id_client').get(verifyTokenClient, rdvController.getRdvClient);
    apiRouter.route('/rdv/confirmRdv').post(verifyTokenMedecin, rdvController.confirmRdv);
    apiRouter.route('/rdv/denieRdv').post(verifyTokenMedecin, rdvController.denieRdv);



    return apiRouter;
})();

