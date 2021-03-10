import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  searchText = '';
  showForm = false;
  editForm = false;
  myTask : Task= {
    label : '',
    completed:false
  }

  tasks: Task[] = [] ;
  resulttasks: Task[] = [] ;
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll()
        .subscribe(tasks => {
          this.resulttasks = this.tasks  = tasks
        })
  }
  delete(id){
    this.taskService.delete(id)
    .subscribe(() => {
      //this.tasks = this.tasks.filter(task =>task.id != id)
      this.getTasks();
    })

  }
  persistTask(){
    this.taskService.persist(this.myTask)
        .subscribe((task) => {
          this.tasks = [task, ...this.tasks];
          this.success();
        } )
        this.resteTask();
        this.showForm = false;
        
  }
  success(){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    ).then(()=>{
      location.reload();
    })
  }

  resteTask(){
    this.myTask = {
      label : '',
      completed : false
    }
  }

  toggleCompleted(task){
    this.taskService.completed(task.id,task.completed)
        .subscribe(() => {
          task.completed = !task.completed
        })
  }

  editTask(task){
    this.showForm = true;
    this.myTask = task
    this.editForm = true;
    
  }

 updateTask() {
   this.taskService.update(this.myTask)
      .subscribe(task => {
        this.resteTask();
        this.editForm = false;
      })
 }

 searchTasks(){
   this.resulttasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))
 }

 remove (id){
  this.showForm = false;
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      ).then(()=>{
        
        this.delete(id);

      })
      
      
    }
    
    
    
  })
 }

}
