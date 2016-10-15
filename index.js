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
    student.create(dbModel.connection, new Student({firstname: faker.name.firstName(), lastname: faker.name.lastName(), cohort_id: Math.ceil(Math.random()*3)}), (err,row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${i+1} New student added!`);
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

let foxes = (cohort_id) => {
    cohort.cohort_students(dbModel.connection, cohort_id);
}


let editStudentName = (value,id) => {
      student.update(dbModel.connection, 'firstname', value, id);
      console.log(`firstname updated at id ${id} = ${value}`);
}


let editCohortName = (value,id) => {
      cohort.update(dbModel.connection, 'name', value, id);
      console.log(`Cohort name updated at id ${id} = ${value}`);
}


let killStudent = (id) => {
      student.destroy(dbModel.connection, `id = ${id}`, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Killed!');
        }
      });
}

let demolishCohort = (id) => {
      cohort.destroy(dbModel.connection, `id = ${id}`, (err,row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Cohort at id ${id} has been demolished`);
        }
      });
}


//
var r = repl.start({prompt: '>'});
r.context.makeTable = makeTable
r.context.insertNewStudent = insertStudent
r.context.insertNewCohort = insertCohort
r.context.viewAllStudents = allStudents
r.context.viewAllCohorts = allCohorts
r.context.foxes = foxes  // foxes(cohort_id) // Show joined table between student and cohort
r.context.deleteStudent = killStudent // require (student_id)
r.context.deleteCohort = demolishCohort // require (cohort_id)
r.context.editStudentName = editStudentName //require (value, student_id)
r.context.editCohortName = editCohortName //require (value, cohort_id)
