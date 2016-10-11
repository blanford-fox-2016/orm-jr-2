"use strict"
let sqlite3 = require('sqlite3')

class DBModel {
  constructor(){
    this.connection = new sqlite3.Database('./db/data.db')
    this.student_firstname
    this.student_lastname
    this.cohort_name
    this.cohort_id
  }
  static create(dbModel, newData){
    // dbModel.serialize(function(){
    //   dbModel.run(`CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname NOT NULL, lastname NOT NULL, cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohort(id))`, (err) => {
    //     if(err){
    //       console.log(err);
    //     }else{
    //       //console.log("Created Database, SUCCESS");
    //     }
    //   })
    //
    //   dbModel.run(`INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${newData.firstname}', '${newData.lastname}', '${newData.cohort_id}')`, (err) => {
    //     if(err){
    //       console.log(err);
    //     }else{
    //       console.log("Insert Data to Database, SUCCESS");
    //     }
    //   })
    // })
    console.log("test");
  }
}

export default DBModel
