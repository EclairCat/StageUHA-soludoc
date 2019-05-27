
//Imports
var express = require('express');
var apiRouter = require('./apiRouter').router;

//Init Server
var serveur = express();


//Configure routes
serveur.use('/api/', apiRouter);


//Launch server
serveur.listen(3000, function () {
        console.log('server en écoute sur port 3000');
});