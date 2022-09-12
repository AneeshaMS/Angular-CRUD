import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Details } from '../model/details';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue : FormGroup; //reactive form

  addEmployeeObj:Details=new Details();  //addEmployeeObj enna valuenu details enna model assign chythu
  allEmployee:any

  //show and hide add and update buttons
  setAdd:boolean
  setUpdate:boolean

  constructor(private fb:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {

    //reactive forms values

    this.formValue=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      salary:['',Validators.required]
    })

    this.getAllEmployee();
  }

  //to retrive all employees in the table
  getAllEmployee(){
    this.api.getEmployee().subscribe(data=>{
      this.allEmployee=data
    })
  }

 //to add new employee

  //when clicked only add button will show
  createEmployee(){
    this.setAdd=true
    this.setUpdate=false
  }

  //to add new employee
  addEmployee(){

    //formil ulla values modelil pass chyunnu
    this.addEmployeeObj.firstname=this.formValue.value.firstname
    this.addEmployeeObj.lastname=this.formValue.value.lastname
    this.addEmployeeObj.email=this.formValue.value.email
    this.addEmployeeObj.mobile=this.formValue.value.mobile
    this.addEmployeeObj.salary=this.formValue.value.salary

    //service call
    this.api.postEmployee(this.addEmployeeObj).subscribe(data=>{
      console.log(data);
      alert('Employee addedd successfully')
      //data add ayathum modal form close chyuvan
      let ref=document.getElementById("close")
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee()
    })  
  }

 //to delete employee

  deleteEmployee(employee:any){
    this.api.deleteEmployee(employee.id).subscribe(()=>{
      alert('Employee deleted succesfully')
      this.getAllEmployee()
    })
  }

//To edit existing employee

  onEdit(employee:any){
    //condition base chyth update button show chyuvan
    this.setAdd=false
    this.setUpdate=true

   //id pass chyunn
    this.addEmployeeObj.id=employee.id  
 // update button click chyumpol athil ulla existing value formil display chyuvan
    this.formValue.controls['firstname'].setValue(employee.firstname)
    this.formValue.controls['lastname'].setValue(employee.lastname)
    this.formValue.controls['email'].setValue(employee.email)
    this.formValue.controls['mobile'].setValue(employee.mobile)
    this.formValue.controls['salary'].setValue(employee.salary)
  }

  //update employee
  updateEmployee(){
     //formil ulla values modelil pass chyunnu
    this.addEmployeeObj.firstname=this.formValue.value.firstname
    this.addEmployeeObj.lastname=this.formValue.value.lastname
    this.addEmployeeObj.email=this.formValue.value.email
    this.addEmployeeObj.mobile=this.formValue.value.mobile
    this.addEmployeeObj.salary=this.formValue.value.salary
//update api call
this.api.putEmployee(this.addEmployeeObj,this.addEmployeeObj.id).subscribe(data=>{
  console.log(data)
  alert('Employee updated successfully')
   //data add ayathum modal form close chyuvan
      let ref=document.getElementById("close")
      ref?.click()
      this.formValue.reset();
      this.getAllEmployee()
})

  }

}
