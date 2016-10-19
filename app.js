"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');



var replServer = repl.start({prompt: 'orm-jr-2> '});
replServer.defineCommand('setup', {
  help: 'Juang || > .setup students || cohorts  * one time only',
  action: function(name) {
    DBModel.setup(name);
    this.displayPrompt();
  }
});

replServer.defineCommand('create', {
  help: 'Juang || .create > .create Student std_first_name std_last_name std_cohort_id',
  action: function(data) {
    data = data.split(" ");
    if (data[0] === 'Student') {
      let s_obj = {
        first_name: data[1],
        last_name: data[2],
        cohort_id: data[3]
      }
      DBModel.create(data[0], s_obj);
    } else {
      let c_obj = {
        name: data[1]
      }
      DBModel.create(data[0], c_obj);
    }
  }
});

replServer.defineCommand('update', {
  help: 'Juang || .update > .update Student id first last cohort_id || > .update Cohort id name',
  action: function(data) {
    data = data.split(" ");
    if (data[0] === 'Student') {
      let s_obj = {
        first_name: data[2],
        last_name: data[3],
        cohort_id: data[4]
      }
      DBModel.update(data[0], data[1], s_obj);
    } else {
      let c_obj = {
        id: data[1],
        name: data[2]
      }
      DBModel.update(data[0], c_obj);
      console.log("It's been updated");
    }
  }
});

replServer.defineCommand('show', {
  help: 'Juang || > .show Student || Cohort',
  action: function(data) {
    data = data.split(" ");
    DBModel.all(data[0]);
  }
});

replServer.defineCommand('delete', {
  help: 'Juang || .delete <Student or Cohort => > .delete Student id || > .delete Cohort id',
  action: function(data) {
    data = data.split(" ");
    DBModel.delete(data[0], data[1])
  }
});

replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});
