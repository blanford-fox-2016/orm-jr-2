"use strict"

let sqlite3 = require('sqlite3').verbose();
let file = new sqlite3.Database('./db/init.sql');

class DBModel {
  constructor() {
    this.connection = file;
  }

  static setup(roles) {
    if (roles === 'students') {
      file.run("CREATE TABLE students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name STRING, last_name STRING, cohort_id INTEGER);");
    } else {
      file.run("CREATE TABLE cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);");
    }
  }

  static create(tb_name, object) {
    if (tb_name === 'Student') {
      file.run(`INSERT INTO students(first_name, last_name, cohort_id) VALUES ('${object.first_name}', '${object.last_name}', '${object.cohort_id}');`, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Student Row is created");
        }
      });
    } else {
      file.run(`INSERT INTO cohorts (name) VALUES ('${object.name}');`, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Cohort Row is created");
        }
      });
    }
  }

  static update(tb_name, id, object) {
    if (tb_name === 'Student') {
      file.run(`UPDATE students SET first_name = '${object.first_name}', last_name = '${object.last_name}', cohort_id = '${object.cohort_id}' WHERE id = '${id}'`);
    } else {
      file.run(`UPDATE cohorts SET name = '${object.name}' WHERE id = '${id}'`);
    }
  }

  static find(connection, id, object) {
    file.run(`SELECT id FROM students WHERE id = ${id};`, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`${object}`);
      }
    });
  }

  static delete(tb_name, id) {
    if (tb_name === 'Student') {
      file.run(`DELETE FROM students WHERE id = '${id}'`, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`The id = '${id}' is being deleted`);
        }
      });
    } else {
      file.run(`DELETE FROM cohorts WHERE id = '${id}'`, (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`The id = '${id}' is being deleted`);
        }
      });
    }
  }

  static all(tb_name) {
    if (tb_name === 'Student') {
      file.each(`SELECT * FROM students`, (error, data) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data.id + " " + data.first_name + " " + data.last_name + " " + data.cohort_id);
        }
      });
    } else {
      file.each(`SELECT * FROM cohorts`, (error, data) => {
        if (error) {
          console.error(error);
        } else {
          console.log(data.id + " " + data.name);
        }
      });
    }
  }
}

export default DBModel
