"use strict"

class DBModel {
  constructor() {
    this.sqlite3 = require('sqlite3').verbose();
    this.connection = new this.sqlite3.Database('./db/init.sql');
  }

  create_table_students(cb) {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT NOT NULL, lastname TEXT, cohort_id INTEGER, FOREIGN KEY (cohort_id) REFERENCES cohorts(id));`
    this.connection.run(CREATE_TABLE, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  create_table_cohorts(cb) {
    let CREATE_TABLE = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);`
    this.connection.run(CREATE_TABLE, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  create(connection, object, cb){
    if (this.table == 'students') {
      let INSERT_DATA = connection.prepare(`INSERT INTO students VALUES (null, ?, ?, ?)`);
      INSERT_DATA.run(object.firstname, object.lastname, object.cohort_id,
       () => {
        if (cb != null) {
          cb();
        }
      });
      INSERT_DATA.finalize();
    } else {
      let INSERT_DATA = connection.prepare(`INSERT INTO cohorts VALUES (null, ?)`);
      INSERT_DATA.run(object.name, () => {
        if (cb != null) {
          cb();
        }
      })
      INSERT_DATA.finalize();
    }

  }

  all(connection, cb) {
    let READ_ALL = `SELECT * FROM ${this.table}`;
    this.connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        if (this.table == 'students') {
          console.log(`${row.id} | ${row.firstname} | ${row.lastname} | ${row.cohort_id}`);
        } else {
          console.log(`${row.id} | ${row.name} `);
        }

      }
    }, () => {
      if (cb != null) {
        cb();
      }
    });

  }

  find(connection, id) {
    let FIND_ID = `SELECT * FROM '${this.table}' WHERE id = '${id}'`;
    console.log(FIND_ID);
    console.log(this.connection);
    this.connection.each(FIND_ID, function(row){return row})
    // => {
    //   console.log(row);
    //   if (cb != null) {
    //     cb(err,row);
    //   }
    // }


  }

  where(connection, condition) {
    let WHERE = `SELECT * FROM ${this.table} WHERE ${condition}`;
    connection.each(WHERE, () => {
      if (cb != null) {
        cb();
      }
    })
  }

  update(connection, col, val, id, cb) {
    let UPDATE = connection.prepare(`UPDATE ${this.table} SET '${col}' = ? WHERE id = ?`);
    UPDATE.run(val, id, () => {
      if (cb != null) {
        cb();
      }
    });
    UPDATE.finalize();

  }

  destroy(connection, condition, cb) {
    let DESTROY_DATA = `DELETE FROM ${this.table} WHERE ${condition}`;

    connection.run(DESTROY_DATA, () => {
      if (cb != null) {
        cb();
      }
    })

  }


}


export default DBModel
// export default repl

// console.log(dbModel.connection);
// dbModel.create_table_cohorts();
