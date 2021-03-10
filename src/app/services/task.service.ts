import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl = 'http://localhost:5000/tasks'
  constructor(private http: HttpClient) { 

   }
   findAll(){
     return this.http.get<Task[]>(this.apiUrl);
   }
   delete(id){
     return this.http.delete('http://localhost:5000/tasks/'+id)
   }
   persist(task){
     return this.http.post<Task>(this.apiUrl, task);
   }
   completed(id,completed){
    return this.http.patch('http://localhost:5000/tasks/'+id,{completed:!completed})
   }
   update(task){
    return this.http.put('http://localhost:5000/tasks/'+task.id,task)
   }
}
