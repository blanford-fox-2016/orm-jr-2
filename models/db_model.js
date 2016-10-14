"use strict"
let sqlite3 = require('sqlite3')
import Cohort from "../models/cohort.js";
import Student from "../models/student.js";

class DBModel {
  constructor(){
    this.connection = new sqlite3.Database('./db/data.db')
  }

  all(type, dbModel, functionData){
    if(type === "cohort"){
      dbModel.each(`SELECT * from cohort`, (err, row) => {
        functionData([row.id, row.name], err)
      })
    }else{
      dbModel.each(`SELECT * from student`, (err, row) => {
        functionData([row.id, row.firstname, row.lastname, row.cohort_id], err)
      })
    }
  }

  create(dbModel, data){
    // console.log(newData);
    let newData
    if(data[0] === "cohort"){
      for(var i = 2; i < data.length ; i++){
        data[1] += ' ' + data[i]
      }
      newData = new Cohort(data[1])
      dbModel.serialize(function(){
        dbModel.run(`CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL)`, (err) => {
          if(err){
            console.log(err);
          }else{
            // console.log("Created Database, SUCCESS");
          }
        })
        dbModel.run(`INSERT INTO cohort (name) VALUES ('${newData.name}')`, (err) => {
            if(err){
              console.log(err);
            }else{
              console.log("Insert Data to Database, SUCCESS");
            }
          })
      })
    }else{
      // console.log(data);
      newData = new Student(data[1], data[2], data[3])
      // console.log(newData);
      dbModel.serialize(function(){
        dbModel.run(`CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname NOT NULL, lastname NOT NULL, cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohort(id))`, (err) => {
          if(err){
            console.log(err);
          }else{
            //console.log("Created Database, SUCCESS");
          }
        })

        dbModel.run(`INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${newData.firstname}', '${newData.lastname}', '${newData.cohort_id}')`, (err) => {
          if(err){
            console.log(err);
          }else{
            console.log("Insert Data to Database, SUCCESS");
          }
        })
      })
    }

  }

  where(type, dbModel,where_clause,newData){
    if(type === 'cohort'){
      dbModel.each(`SELECT * FROM cohort WHERE ${where_clause}`,(err, row)=>{
        newData([row.id, row.name],err)
      })
    }else{
      dbModel.each(`SELECT * FROM student WHERE ${where_clause}`,(err, row)=>{
        newData([row.id, row.firstname, row.lastname, row.cohort_id],err)
      })
    }
  }

  find(type, dbModel, id, functionData, cb){
    if(type === 'cohort'){
      let newCohort
      dbModel.each(`SELECT * FROM cohort WHERE id = ${id}`, (err, row) => {
        // console.log(row.name);
        newCohort = new Cohort(row.name, row.id)
        functionData(newCohort)
        cb != null ? cb(newCohort) : ''
      })
    }else{
      let newStudent
      dbModel.each(`SELECT * FROM student WHERE id = ${id}`, (err, row) => {
        // console.log(row.name);
        console.log(row);
        // newStudent = new Student(row.firstname, row.lastname, row.cohort_id, row.id)
        // functionData(newStudent)
        cb != null ? cb(newStudent) : ''
      })
    }
  }

  update(type, dbModel, newData){
    if(type === 'cohort'){
      dbModel.run(`UPDATE cohort set name = '${newData[2]}' WHERE id = '${newData[1]}'`, (err) => {
        if(err){
          console.log(err);
        }else{
          console.log(`Cohort Updated`);
        }
      })
    }else{
      // console.log(newData);
      dbModel.run(`UPDATE student set firstname = '${newData[2]}', lastname = '${newData[3]}', cohort_id = '${newData[4]}' WHERE id = '${newData[1]}'`, (err) => {
        if(err){
          console.log(err);
        }else{
          console.log(`Student Updated`);
        }
      })
    }
  }

  delete(type, dbModel, id){
    dbModel.run(`DELETE FROM ${type} WHERE id = '${id}'`, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log(`Data Deleted`);
      }
    })

  }
}

export default DBModel
