"use strict"

class DBModel {
  constructor(){

  }
  static get connection(){
    let sqlite = require('sqlite3').verbose();
    let db = new sqlite.Database('./db/init.db')
    return db
  }



  createTableCohort(connection){
    let CREATE_TABLE_STUDENT = "CREATE TABLE IF NOT EXISTS cohort (id INTEGER PRIMARY KEY AUTOINCREMENT, nama TEXT NOT NULL);"
   connection.serialize(() =>{
     connection().run(CREATE_TABLE_STUDENT, (err) =>{
         if(err){
             console.log(err);
         }else{
           console.log("Table Cohort Created");
         }
     })
   })
  }

  create_table(connection){
    connection.serialize(() =>{
      connection.run(`CREATE TABLE IF NOT EXISTS student (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, cohort_id INTEGER);`, (err) =>{
       if(err){
           console.log(err);
       }else{
         console.log("Table Student Created");
       }
     })
   })
  }

  create(connection, obj){
    connection.serialize(() => {
      let INSERT = `INSERT INTO cohort (nama) VALUES ('${obj.nama}');`
      connection.run(INSERT, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log('COHORT ADDED');
        }
      })
    })
  }


  where(connection, str, cb){
    let READ_ALL = `SELECT * FROM cohort WHERE ${str}`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.nama}`);
      }
    });
  }

  destroy(connection, id, ontable){
    let DELETE = `DELETE FROM ${ontable} WHERE id = ${id};`
    connection.run(DELETE, (err) => {
      if (err){
        console.log(err);
      } else {
        console.log(`Data ${id} Deleted`);
      }
    })
  }

  create(connection, obj){
      let INSERT = `INSERT INTO student (firstname, lastname, cohort_id) VALUES ('${obj.firstname}', '${obj.lastname}', '${obj.cohort_id}');`
      //console.log(INSERT);
      connection.run(INSERT, (err) => {
        if (err){
          console.log(err);
        } else {
          console.log('STUDENT ADDED');
        }
      })
  }

  all(connection, ontable, cb){
    let READ_ALL = `SELECT * FROM ${ontable}`;
    connection.each(READ_ALL, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`${row.id} | ${row.firstname} ${row.lastname} | ${row.cohort_id}`);
      }
    });
  }

  // destroy(connection, id){
  //   let DELETE = `DELETE FROM student WHERE id = ${id};`
  //   connection.run(DELETE, (err) => {
  //     if (err){
  //       console.log(err);
  //     } else {
  //       console.log(`Data ${id} Deleted`);
  //     }
  //   })
  // }

  update(connection, param, val, id, cb){
    connection.run(`UPDATE student SET '${param}'='${val}' WHERE id=${id}`, (err)=>{
       if(err){
         console.log(err);
       }else{
         console.log("Ubah Data Success");
       }
     })
  }




}

export default DBModel
