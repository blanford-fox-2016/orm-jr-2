"use strict"

let sqlite3 = require('sqlite3').verbose();
let file = new sqlite3.Database('../db/init.sql');

class DBModel {
  constructor() {
    this.connection = file;
  }

  setup(roles) {
    if (roles = 'students') {
      this.connection.run("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, cohort_id INTEGER)");
    } else {
      this.connection.run("CREATE TABLE cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
    }
  }

  static create(connection, object) {
    if (`${object}.length` === 4) {
      connection.run(`INSERT INTO students(first_name, last_name, cohort_id) VALUES ('${object.first_name}', '${object.last_name}', '${object.cohort_id}');`, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Row is created");
        }
      });
    } else {
      console.log("Not Student");
    }
  }

  static update(connection, id, object) {
    connection.run(`UPDATE students SET first_name = '${object.first_name}', last_name = '${object.last_name}', cohort_id = '${object.cohort_id}' WHERE id = '${id}'`);
  }

  static find(connection, id, object) {
    connection.run(`SELECT id FROM students WHERE id = ${id};`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`${object}`);
      }
    });
  }

  static delete(connection, id) {
    connection.run(`DELETE FROM students WHERE id = '${id}'`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`The id = '${id}' is being deleted`);
      }
    });
  }

  static all(connection) {
    connection.each(`SELECT * FROM students`, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        console.log(data.id + " " + data.first_name + " " + data.last_name + " " + data.cohort_id);
      }
    })
  }
}


export default DBModel
