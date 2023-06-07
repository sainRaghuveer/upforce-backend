const express = require("express");
const controller = require("../controllers/exportCSV.controller")


////Creating routes with express routes 
const exportCSVRouter = express.Router();


/*--------------------- user data exported in csv Route ----------------------*/
exportCSVRouter.get('/export-csv', controller.exportCSV)


module.exports = {
    exportCSVRouter
}