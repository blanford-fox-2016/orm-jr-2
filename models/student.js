"use strict"

class Student {
  constructor(firstname, lastname, cohort_id, id){
    this.firstname = firstname
    this.lastname = lastname
    this.cohort_id = cohort_id
    this.id = id || null
  }

}

export default Student
