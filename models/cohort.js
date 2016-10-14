"use strict"

// import Student from "./student.js";
import DBModel from './db_model.js';

class Cohort extends DBModel {
  constructor(property){
    super()
    this.table = 'cohorts'
    this.name = property['name'] || ""
  }

  cohort_students(connection, id, cb) {
    let COHORT_STUDENTS = `SELECT students.firstname, students.lastname, cohorts.name FROM students JOIN cohorts ON students.cohort_id = cohorts.id WHERE students.cohort_id = '${id}'`;
    console.log("Nama siswa | Angkatan");
    connection.each(COHORT_STUDENTS, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.firstname} ${row.lastname} |  ${row.name} `);
      }
    }, () => {
      if (cb != null) {
        cb();
      }
    });
  }

}

export default Cohort
