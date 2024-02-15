import { Component,OnInit} from '@angular/core';
import {TaskService} from '../task.service';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent implements OnInit{
  tasks :any[]=[];
  editingTask:any=null;

  constructor (private taskService :TaskService){}

  ngOnInit(){
    this.loadTasks(); //it calls the loadtask methosd when the componenet is initialised

  }
  loadTasks(){ //loadtasks method
    this.taskService.getTasks().subscribe((tasks)=>{
      this.tasks=tasks; //loadTasks methoduses taskService to fetch tasks and subscribes to the observable when data is recived,it updates the tasks properly

    });
  }

  deleteTask(id:string){
    this.taskService.deleteTask(id).subscribe(()=>{
      this.loadTasks();  //it reloads the remaining tasks
    });
  }

  editTask(task:any){
    this.editingTask= { ...task};
  }

  cancelEdit(){
    this.editingTask=null;
  }

  updateTask(){
    this.taskService.updateTask(this.editingTask._id, this.editingTask).subscribe(()=>{
      console.log('task updated successfully');
      this.editingTask=null; //resets the editingtask to null
      this.loadTasks(); //reloads the tasks
    })
  }
}
