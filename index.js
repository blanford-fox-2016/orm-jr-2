"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";


// DBModel.create(DBModel.connection, new Student("Riza", "Fahri", 1))
// DBModel.create(DBModel.connection, new Cohort("Math"))

//
// DBModel.all(DBModel.connection, new Student(), function(data, err){
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
// })

// DBModel.all(DBModel.connection, new Cohort(), function(data, err){
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
// })



//
//
//
// DBModel.where(DBModel.connection, 1 , new Student(), function(data, err){
//   // console.log(data.length);
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
// })

// DBModel.where(DBModel.connection, 1 , new Cohort(), function(data, err){
//   // console.log(data.length);
//   if (!err) {
//     for (var i = 0; i < data.length; i++) {
//       console.log(data[i]);
//     }
//   } else {
//     console.log("Error");
//   }
// })

let cohort = {}
DBModel.find(DBModel.connection, 1, new Student(), function(data){
    cohort.data = data
    cohort.name = "TESTING LAGI"
    DBModel.update(DBModel.connection, new Student(), cohort.data, cohort.name)
})
