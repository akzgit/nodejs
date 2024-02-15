import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiurl='http://localhost:3000/api/tasks';
  constructor(private http:HttpClient){ }

  getTasks() :Observable <any>{
    return this.http.get(this.apiurl); //reading
  }

  addtask(task:any):Observable<any>{
    return this.http.post(this.apiurl,task); //creating
  }

  updateTask(id:string,task:any):Observable <any>{
    return this.http.put(`${this.apiurl}/${id}`,task)
  }

  deleteTask(id:string):Observable<any>{
    return this.http.delete(`${this.apiurl}/${id}`);
  }

}
