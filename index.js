"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

let dbModel = new DBModel()

Student.create()

//Create & Insert Data
// Student.create(dbModel.connection, new Student("Mangku", "Widodo", 1))
// Student.create(dbModel.connection, new Student("Ken", "Putra", 1))
// Student.create(dbModel.connection, new Student("Jokowow", "Widodo", 2))

// Cohort.create(dbModel.connection, new Cohort("Coding Bootcamp Hacktiv8"))
// Cohort.create(dbModel.connection,new Cohort("PPAP"))
// Cohort.create(dbModel.connection,new Cohort("BULOK"))
// Cohort.create(dbModel.connection,new Cohort("WIDODO.inc"))

// Cohort.create(dbModel.connection,new Cohort("Cohort Baru"))

//Read
// Student.all(dbModel.connection, function(data, err){
//   // console.log(data);
//   if(!err){
//     for(var i = 0 ; i < data.length; i++){
//       console.log(data[i].toString());
//     }
//     console.log(`--------------`);
//   }else{
//     console.log(`error`);
//     console.log(err);
//   }
// })

// Cohort.where(dbModel.connection,'cohort.id=1',function(data,err){
//   if(!err){
//     for(var i=0; i < data.length; i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// });


//update
// let cohort
//
// let functionCB = (cohort) => {
//   // console.log(cohort);
//   // console.log(cohort.name);
//   Cohort.update(dbModel.connection, cohort)
// }
//
// Cohort.find(dbModel.connection, 7, function(data){
//   // console.log(data.name);
//   cohort = data
//   // console.log(cohort.id);
//   cohort.name = "new Cohort"
//   // console.log(cohort.name);
//   // Cohort.update(dbModel.connection, cohort)
// }, functionCB)
//
// Cohort.find(dbModel.connection, 7, function(data){
//   console.log(data.name);
// })



// setTimeout(function(){
//   console.log(cohort.name);
// }, 1000)
