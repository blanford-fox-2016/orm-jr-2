"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl');



var replServer = repl.start({prompt: 'orm-jr-2> '});
replServer.defineCommand('setup', {
  help: 'to setup the program .setup <students || cohorts>',
  action: function(name) {
    DBModel.setup(name);
    this.displayPrompt();
  }
});

replServer.defineCommand('create', {
  help: '.create (to create a row of Student or cohort) || .create Student std_first_name std_last_name std_cohort_id',
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
      console.log(data);
    }
    // console.log(data[0]);
    // DBModel.setup(name);
    // this.displayPrompt();
  }
});
replServer.defineCommand('saybye', function() {
  console.log('Goodbye!');
  this.close();
});



// let ruby = {
//   first_name: "Ruby",
//   last_name: "Sanjaya",
//   cohort_id: 1
// }
//
// //let dbModel = new DBModel();
// DBModel.create("Student", ruby);

//DBModel.setup('cohorts');


//dbModel.create(dbModel.connection, new Student("Henjaya", 1));
// Student.create(dbModel.connection, new Student("Fahmi", "Riza", 1));
// // Student.create(dbModel.connection, new Student("juang", "wiantoro", 1));
// // Student.delete(dbModel.connection, 2);
// Student.showAll(dbModel.connection);
// // Cohort.create(dbModel.connection, new Cohort("America"));
//
// let student = new Student("Bagus", "Juang", 1);
// // // //console.log(student.first_name);
// Student.update(dbModel.connection, 5, student);
