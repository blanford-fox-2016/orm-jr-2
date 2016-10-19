"use strict"

import Student from "./student.js";
import DBModel from "./db_model.js"

 class Cohort extends DBModel{
  constructor(nama){
    super()
    this.nama = nama
  }
}


export default Cohort

  // createTableCohort(connection){
  //   let CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL);"
  //  connection.serialize(() =>{
  //    connection().run(CREATE_TABLE_STUDENT, (err) =>{
  //        if(err){
  //            console.log(err);
  //        }else{
  //          console.log("Table Cohort Created");
  //        }
  //    })
  //  })
  // }
  //
  // create(connection, obj){
  //   connection.serialize(() => {
  //     let INSERT = `INSERT INTO cohort (nama) VALUES ('${obj.nama}');`
  //     connection.run(INSERT, (err) => {
  //       if (err){
  //         console.log(err);
  //       } else {
  //         console.log('COHORT ADDED');
  //       }
  //     })
  //   })
  // }
  //
  //
  // where(connection, str, cb){
  //   let READ_ALL = `SELECT * FROM cohort WHERE ${str}`;
  //   connection.each(READ_ALL, (err, row) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(`${row.id} | ${row.nama}`);
  //     }
  //   });
  // }
  //
  // destroy(connection, id){
  //   let DELETE = `DELETE FROM cohorts WHERE id = ${id};`
  //   connection.run(DELETE, (err) => {
  //     if (err){
  //       console.log(err);
  //     } else {
  //       console.log(`Data ${id} Deleted`);
  //     }
  //   })
  // }



// Cohort.createTableCohort(DBModel.connection);
// // angkatan.create()
// angkatan.where()
