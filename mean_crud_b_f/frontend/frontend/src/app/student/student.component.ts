import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  currentStudentID="";
  name: string="";
  address:string="";
  phone:string="";


  //retrieve all data..
  studentArray:any[]=[];
  constructor(private http:HttpClient){
    this.getAllStudent();
  }
getAllStudent(){
  this.http.get("http://localhost:5000/studentDetails")
  .subscribe((resultData:any)=>{
    console.log(resultData);
    this.studentArray=resultData;
  });
}


setUpdate(data: any)
{
 this.name = data.name;
 this.address = data.address;
 this.phone = data.phone;
 this.currentStudentID = data._id;

}
UpdateRecords()
{
  let bodyData = {
    "name" : this.name,
    "address" : this.address,
    "phone" : this.phone,
  };

  this.http.patch("http://localhost:5000/students"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Student Updateddd")
      this.getAllStudent();

  });
}

setDelete(data: any) {
  this.http.delete("http://localhost:5000/students"+ "/"+ data._id).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Student Deletedddd")
      this.getAllStudent();

  });
  }

save()
{
  if(this.currentStudentID == '')
  {
      this.registration();
  }
    else
    {
     this.UpdateRecords();
    }
}

//inserting data....
registration(){
  let userData = {
    "name" : this.name,
    "address" : this.address,
    "phone" : this.phone
  };
  this.http.post("http://localhost:5000/student/create", userData)
  .subscribe((resultData : any)=>{
    console.log(resultData);
    alert("Student data inserted successfully!");
    this.name = '';
    this.address = '';
    this.phone = '';
    this.getAllStudent();
  });
}


}
