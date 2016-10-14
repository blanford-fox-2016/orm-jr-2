"use strict"

import DBModel from "../models/db_model.js";

class Cohort extends DBModel {
  constructor(name, id){
    super()
    this.id = id || null
    this.name = name
  }

}



export default Cohort
