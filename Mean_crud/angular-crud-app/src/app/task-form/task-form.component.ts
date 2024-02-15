import { Component,Input } from '@angular/core';
//Importing necessary decorators and modules from angular
import {TaskService} from '../task.service';
//importing the task service from ../task.service path : this service handles the interactions with the backend
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  @Input() editing=false;
  @Input() task:any={title:'',description:''};

  constructor(private taskService : TaskService){}

  submitForm(){
     if(this.editing){
      this.taskService.updateTask(this.task._id, this.task).subscribe(
        ()=>console.log('Task updated successfully'),
        error=>console.error('Error updating task : ',error)
      );
     }
     else{
      this.taskService.addtask(this.task).subscribe(
        ()=> console.log('Task added successfully'),
        error=>console.error('Error adding task : ',error)
      )
     }
  }
}

