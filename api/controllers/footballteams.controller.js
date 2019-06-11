'use strict';
const _ = require('lodash');
const util = require('util');	// Required in swagger sample controller
var controllerHelper = require('../helpers/controller.helper');
var messageHelper = require('../helpers/message.helper');
//var shortid = require('shortid');


const { footballteams } = require('../models');	// Sequelize

////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////


// Module Name
const MODULE_NAME = '[footballteams.controller]';

// Error Messages
const GS_CT_ERR_FOOTBALLTEAMS_NOT_FOUND = 'Football teams not found';

// Success Messages
const GS_CT_DELETED_SUCCESSFULLY = 'Football teams deleted successfully';

////////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
////////////////////////////////////////////////////////////////////////////////
function getfootballteamsbyId(req, res) {
  //console.log("operadores.controller getOperadorById");
  try {

    console.log(req.swagger.params.id.value);
    var id = req.swagger.params.id.value;
   
    console.log("footballteams by id..." + id);
    //console.log(footballteams);

    footballteams.findByPk(id)
    .then(myfootballteams => {
    console.log(myfootballteams);
    res.status(200).send(myfootballteams);
   })

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, getfootballteamsbyId.Name, error, res);
  }
}

function getFootballteams(req, res) {

  try {
        
   console.log("footballteams...");
   console.log(footballteams);
   footballteams.findAll({
    /*include: [{
      model: orderstatus
     
    }]

    include: [{ all: true, nested: true }]*/
      })
   .then((myfootballteams) => {
     console.log(myfootballteams);
     res.status(200).send(myfootballteams);
     //utils.writeJson(res, consoles);
   }, (error) => {
     res.status(500).send(error);
   });

  } catch (error) {
    controllerHelper.handleErrorResponse(MODULE_NAME, getfootballteams.Name, error, res);
  }
}

function updatefootballteams(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //console.log("operadores.controller getOperadorById");
  try {
    var id = req.swagger.params.id.value;
   
    console.log("params : " + id);
    var myupdatefootballteams = req.body;
    console.log("update footballteams ... " + myupdatefootballteams.Name + " " + myupdatefootballteams.City);
 

    footballteams.findByPk(id)
      .then(myfootballteams => {
        console.log("Result of findById: " + myfootballteams);
        if (!myfootballteams) {
          res.status(401).send(({}));
        
        }
        return myfootballteams
          .update({ 
            Name: myupdatefootballteams.Name, 
            City: myupdatefootballteams.City 
           })
          .then(() => res.status(200).send(myfootballteams) )
          .catch(error => res.status(403).send(myfootballteams));
        })
      .catch(error => {
          console.log("There was an error: " + error);
          //resolve(error);
    });

  } catch (error) {
      console.log("Was an error");
      controllerHelper.handleErrorResponse(MODULE_NAME, updatefootballteams.Name, error, res);
  }

}

function addFootballteams(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  try {

    console.log("params : ");
    var myfootballteams = req.body;
    console.log("footballteamss ... " + myfootballteams);
 
      return  footballteams
        .create({
          Name: myfootballteams.Name,
          City: myfootballteams.City,         
          Conference: myfootballteams.Conference,
          Division: myfootballteams.Division

        }, {
        /*  include: [{
            model: order_detail,
            as: 'orderdetail'
          }] */
        })
        .then((myfootballteams) => {
          res.status(201).send(myfootballteams);
              
        })
        .catch((error) => res.status(400).send(error));
    

  } catch (error) {
    console.log("Was an error");
    controllerHelper.handleErrorResponse(MODULE_NAME, addFootballteams.Name, error, res);
  }
}


function deletefootballteams(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 
  console.log(req.swagger.params.id.value);
  var id = req.swagger.params.id.value;
 
  footballteams
    .findByPk(id)
    .then(myfootballteams => {
      console.log("Result of findById: " + myfootballteams);
      if (!myfootballteams) {
        res.status(200).send({"success": 0, "description":"not found !"});
      }
      else
      {
      return myfootballteams
        .destroy()
        .then(() => res.status(200).send({"success": 1, "description":"deleted!"}))
        .catch(error => res.status(403).send({"success": 0, "description":"error !"}))
      }
    })
    .catch(error => {
      console.log("There was an error: " + error);
    });


}

module.exports = {
  getfootballteamsbyId,
  getFootballteams,
  updatefootballteams,
  addFootballteams,
  deletefootballteams,
  GS_CT_ERR_FOOTBALLTEAMS_NOT_FOUND,
  GS_CT_DELETED_SUCCESSFULLY,
  MODULE_NAME
}