"use strict"
//
const repl = require('repl');
import DBModel from './models/db_model.js'
import Cohort from './models/cohort.js'
import Student from './models/student.js'

var dbModel = new DBModel()

//var cohort = new Cohort()
// Student.create(dbModel.connection, new Student("Riza","Fahmi",1))
// Student.create(dbModel.connection, new Student("Rubi","Henjaya",1))
// Cohort.create(dbModel.connection,new Cohort("Math"))



// Student.all(dbModel.connection,function(data,err){
//   if(!err){
//     for(var i=0;i<data.length;i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// })
//
// Cohort.where(dbModel.connection,'groups.id=1',function(data,err){
//   if(!err){
//     for(var i=0;i<data.length;i++){
//       console.log(data[i]);
//     }
//   }else{
//     console.log('Error');
//   }
// })

var replServer = repl.start({prompt: '> '});
replServer.defineCommand('command', {
  help: '\n\n============= (Table Name) ==============\n\nadd(attribute name,attribute ID)\nlist\nupdate (attribute ID,attribute Name)\ndestroy(attribute ID)\n\n',
  action: function(name) {
var splitName = name.split(' ')
    switch (splitName[0]) {
      case 'add':
      var string = ''
      for(var i=2;i<splitName.length;i++)
      {
        string +=' '+splitName[i]
      }
        DBModel.create(dbModel.connection, new DBModel(splitName[1],string,splitName[2],splitName[3],splitName[4]),new DBModel(splitName[1]))
      break;

      case 'list':
      DBModel.all(dbModel.connection,function(data,err){
        if(!err){
          for(var i=0;i<data.length;i++){
            console.log(data[i]);
          }
        }else{
          console.log('Error');
        }
      },new DBModel(splitName[1]))
      break;

      case 'update':
      var string = ''
      for(var i=3;i<splitName.length;i++)
      {
        string +=' '+splitName[i]
      }
      DBModel.find(dbModel.connection,splitName[2],
          function(data){
          DBModel.update(dbModel.connection,string,splitName[3],splitName[4],data,new DBModel(splitName[1]))
          console.log('updated!');
      },new DBModel(splitName[1]))
      break;
      case 'destroy':
      DBModel.Destroy(dbModel.connection,splitName[2],new DBModel(splitName[1]))
      break;
      default:
      console.log('error');
      break;
    }
    this.displayPrompt();
  }
});

replServer.defineCommand('Exit', function() {
  console.log('Goodbye!');
  this.close();
});
