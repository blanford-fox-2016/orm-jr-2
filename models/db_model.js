"use strict"

class DBModel {
  constructor(name,groupName,firstname,lastname,tableID){
    this.repl = require('repl')
    this.sqlite = require('sqlite3').verbose()
    this.file = './db/database.db'
    this.db = new this.sqlite.Database(this.file)
    this.name = name
    this.groupName = groupName
    this.firstname = firstname
    this.lastname = lastname
    this.tableID = tableID
  }
  get connection()
  {
    return this.db
  }

    static create(dbModel,tableName,table)
    {
      if(table.name === 'groups'){
          dbModel.serialize(function(){
          // dbModel.run(`CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT NOT NULL)`,function(err){
          //   if(err)console.log(err);
          //   else console.log(` table created!`);
          // }),
            dbModel.run(`insert into groups(groupname) values ('${tableName.groupName}')`,function(err){
              if(err)console.log(err);
              else console.log(`data inserted!`);
        })
    })
  }else if(table.name === 'students')
  {
    dbModel.serialize(function(){
      //  dbModel.run(`CREATE TABLE IF NOT EXISTS students(id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT NOT NULL, lastname TEXT, groupID INTEGER , FOREIGN KEY(groupID) REFERENCES groups(id))`,function(err){
      //    if(err)console.log(err);
      //    else console.log(` table created!`);
      //  }),
         dbModel.run(`insert into students(firstname,lastname,groupID) values ('${tableName.firstname}','${tableName.lastname}','${tableName.tableID}')`,function(err){
           if(err)console.log(err);
           else console.log(`data inserted!`);
        })
    })
  }
  }

  static find(dbModel,tableID,callback,table)
  {
    if(table.name === 'groups'){
    dbModel.all(`select * from groups where id = ${tableID}`,function(err,row){
      callback(row,err)
    })
  }else if(table.name === 'students')
  {
    dbModel.all(`select * from students where id = ${tableID}`,function(err,row){
       callback(row,err)
    })
  }
  }

  static update(dbModel,newGroup,firstname,lastname,tableID,table)
  {
    if(table.name === "groups"){
    dbModel.run(`update groups set groupname = '${newGroup}' WHERE id = ${tableID[0].id};`)
  }else if(table.name === 'students')
  {
    dbModel.run(`update students set firstname = '${firstname}',lastname = '${lastname}' WHERE id = ${tableID[0].id};`)
  }
  }

  static Destroy(dbModel, tableID,table)
  {
    if(table.name === "groups"){
      dbModel.run(`delete from groups where id = ${tableID}`)
    }else if(table.name === "students")
    {
      dbModel.run(`delete from students where id = ${tableID}`)
    }
  }

  static all(dbModel,callback,table)
  {
    if(table.name === "groups"){
      dbModel.all(`select * from groups`,function(err,row) {
        callback(row, err)
      })
    }else if(table.name === "students")
    {
      dbModel.all(`select * from students`,function(err,row) {
        callback(row, err)
      })
    }
  }
}
export default DBModel
