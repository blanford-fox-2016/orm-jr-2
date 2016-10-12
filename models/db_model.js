"use strict"



class DBModel {
  constructor() {

  }

  static get connection() {
    const repl = require('repl');
    const db_Model = require('sqlite3').verbose();
    // write your code here
    var file = 'db_model.db';
    var db = new db_Model.Database(file);
    return db
  }

  static all(dataModel, param, cb) {
    if (param.stats == 'student' ) {
      var ALL = "SELECT student.id, student.firstname, student.lastname, cohort_table.cohort_name FROM student JOIN cohort_table ON student.cohort_id = cohort_table.id"
    } else if(param.stats == 'cohort'){
      var ALL = "SELECT * FROM cohort_table"
    }

    dataModel.all(ALL, function(err, row) {
      cb(row)
    });
  }

  static create(dataModel, param) {
    if (param.stats == 'student' ) {
      var CREATE = "CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INT, FOREIGN KEY(cohort_id) REFERENCES cohort(id))"
      var INSERT = `INSERT INTO student VALUES (null, '${param.firstname}', '${param.lastname}', '${param.cohort_id}')`
    } else if(param.stats == 'cohort'){
      var CREATE = "CREATE TABLE IF NOT EXISTS cohort_table (id INTEGER PRIMARY KEY AUTOINCREMENT, cohort_name TEXT NOT NULL)"
      var INSERT = `INSERT INTO cohort_table VALUES (null, '${param.cohort_name}')`
    }

    dataModel.serialize(function(){
      dataModel.run(CREATE, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Succes! create table");
          dataModel.serialize(function(){
            dataModel.run(INSERT, function(err){
              if(err){
                console.log(err);
              }else{
                console.log("Succes! insert 1 row");
              }
            });
          });
        }
      });
    });
  }

  static where(dataModel, where, param, cb) {
    if (param.stats == 'student' ) {
      var WHERE = `SELECT * FROM student WHERE id = ${where}`
    } else if(param.stats == 'cohort'){
      var WHERE = `SELECT * FROM cohort_table WHERE id = ${where}`
    }

    dataModel.all(WHERE, function(err, rows) {
      cb(rows)
    });
  }

  static find(dataModel, id, param, cb) {
    if (param.stats == 'student' ) {
      var FIND = `SELECT * FROM student WHERE id = ${id}`
    } else if(param.stats == 'cohort'){
      var FIND = `SELECT * FROM cohort_table WHERE id = ${id}`
    }

    dataModel.serialize(function(){
      dataModel.each(FIND, function(err, row) {
      cb(row.id)
      });
    })
  }

  static update(dataModel, param, data, name) {
    if (param.stats == 'student' ) {
      var UPDATE = `UPDATE student SET firstname = '${name}' WHERE id = ${data}`
    } else if(param.stats == 'cohort'){
      var UPDATE = `UPDATE cohort_table SET cohort_name = '${name}' WHERE id = ${data}`
    }

    dataModel.run(UPDATE, function(err){
      if(err){
        console.log(err);
      }else{
        console.log(`Succes! UPDATE '${name}'`);
      }
    });
  }
}


export default DBModel
