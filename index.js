"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";


const repl = require('repl')
let dbModel = new DBModel()

var replServer = repl.start({prompt: '> '});

replServer.defineCommand('showall', {
  help: 'type .showall <cohort | student>',
  action: function(data) {
    data = data.toLowerCase()
    dbModel.all(data, dbModel.connection, function(data, err){
      if(!err){
        for(var i = 0 ; i < data.length; i++){
          console.log(data[i].toString());
        }
        console.log(`--------------`);
      }else{
        console.log(`error`);
        console.log(err);
      }
    })
  }
});

replServer.defineCommand('create', {
  help: 'type .create <cohort name> | <student firstname lastname cohortId>',
  action: function(data) {
    data = data.split(" ")
    data[0] = data[0].toLowerCase()
    dbModel.create(dbModel.connection,data)
  }
});

replServer.defineCommand('where', {
  help: 'type .where <cohort cohortId> | <student studentId> <',
  action: function(data) {
    data = data.split(" ")
    data[0] = data[0].toLowerCase()
    dbModel.where(data[0], dbModel.connection,`id=${data[1]}`,function(newData,err){
      if(!err){
        if(data[0] === 'cohort'){
          console.log(`Id cohort : ${newData[0]}`);
          console.log(`Cohort's Name : ${newData[1]}`);
        }else{
          console.log(`Id Student : ${newData[0]}`);
          console.log(`Student's First Name : ${newData[1]}`);
          console.log(`Student's Last Name : ${newData[2]}`);
          console.log(`Student Cohort's ID : ${newData[3]}`);
        }
      }else{
        console.log('Error');
      }
    });
  }
});

replServer.defineCommand('find', {
  help: 'type .find <cohort cohortId> | <student studentId>',
  action: function(data) {
    data = data.split(" ")
    data[0] = data[0].toLowerCase()
    dbModel.find(data[0], dbModel.connection, data[1], function(newData){
      if(data[0] === 'cohort'){
        console.log(`Cohort Name : ${newData.name}`);
      }else{
        console.log(`Student Name : ${newData.firstname} ${newData.firstname} Student Cohort's ID ${newData.cohort_id}`);
      }
    })
  }
});

replServer.defineCommand('update', {
  help: 'type .update <cohort cohortId newName> | <student studentId newFirstName newLastName newCohortId>',
  action: function(data) {
    data = data.split(" ")
    data[0] = data[0].toLowerCase()

    dbModel.update(data[0], dbModel.connection, data)
  }
});

replServer.defineCommand('delete', {
  help: 'type .delete <cohort cohortId> | <student studentId>',
  action: function(data) {
    data = data.split(" ")
    data[0] = data[0].toLowerCase()

    dbModel.delete(data[0], dbModel.connection, data[1])
  }
});
