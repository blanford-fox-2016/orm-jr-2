"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const faker = require('faker')
const repl = require('repl')
let dbModel = new DBModel();
let cohort = new Cohort({name : "",});
let student = new Student({firstname: "", lastname: "", cohort_id: ""});

let makeTable = () => {
  dbModel.create_table_students(
    (err) => {
      if(err) {
        console.log(err);
      } else {
        console.log("students TABLE CREATED");
        dbModel.create_table_cohorts(
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("cohorts TABLE CREATED");
            }
          }
        )
      }
    }
  )
}

let insertStudent = () => {

  //Insert random data to table students
  for (var i = 0; i < 200; i++) {
    student.create(dbModel.connection, new Student({firstname: faker.name.firstName(), lastname: faker.name.lastName(), cohort_id: Math.ceil(Math.random()*3)}), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("New student added!");
      }
    })
  }
}

let insertCohort = () => { //CALLBACK HELL
  cohort.create(dbModel.connection, new Cohort({name : "Artic Fox"}), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data inserted!");
      cohort.create(dbModel.connection, new Cohort({name : "Blanford Fox"}), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data inserted!");
          cohort.create(dbModel.connection, new Cohort({name : "Cross Fox"}), (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Data inserted!");
            }
          })
        }
      })
    }
  })
}

let allStudents = () => {
  student.all(dbModel.connection, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("That's all!");
    }
  })
}

let allCohorts = () => {
  cohort.all(dbModel.connection, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Thats all!");
    }
  })
}

let foxes = (param) => {
    //Blanford fox
    cohort.cohort_students(dbModel.connection, param);
}


let editName = () => {
  student.find(dbModel.connection, 199, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Data asli : ${row.firstname}`);
      student.update(dbModel.connection, 'firstname', "Ahyana", row.id);
    }
  })

  student.find(dbModel.connection, 200, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Data asli : ${row.firstname}`);
      student.update(dbModel.connection, 'firstname', "Tama", row.id);
    }
  })
}

let killStudent = (id) => {
  student.find(dbModel.connection, id, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${row.firstname} will be killed!`);
      student.destroy(dbModel.connection, `id = ${row.id}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Killed!');
        }
      });
    }
  })
}


var r = repl.start({prompt: '>'});
r.context.makeTable = makeTable
r.context.insertNewStudent = insertStudent
r.context.insertNewCohort = insertCohort
r.context.viewAllStudents = allStudents
r.context.viewAllCohorts = allCohorts
r.context.foxes = foxes  // foxes(cohort_id)
r.context.deleteStudent = killStudent
r.context.editName = editName
