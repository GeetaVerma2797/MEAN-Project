import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Task } from '../../add.model';
import { TasksService } from '../../add.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // tasks = [
  //   {title:"code for angular module 1", description:'complete the module 1'},
  //   {title:"code for angular module 2", description:'complete the module 2'},
  //   {title:"code for angular module 3", description:'complete the module 3'},
  //   {title:"code for angular module 4", description:'complete the module 4'},
  //   {title:"code for angular module 5", description:'complete the module 5'},
  //   {title:"code for angular module 6", description:'complete the module 6'},
  //   {title:"code for angular module 7", description:'complete the module 7'},
  //   {title:"code for angular module 8", description:'complete the module 8'},
  // ];

  @Input()tasks: Task[] = [];
  private tasksSub : Subscription;
  private authListenerSubs: Subscription;
  public userIsAuthenticated = false;
  isLoading = false;
  totalTask = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [1,5,10,100];
  userId = null;
  
  constructor(public tasksService: TasksService, private authService: AuthService){
  }
  
  ngOnInit(){
    this.tasksService.getTasks(this.pageSize,this.pageIndex);
    this.isLoading = true;
    this.tasksSub =  this.tasksService.getTaskUpdateListener().subscribe((taskData: any) => {
      this.isLoading = false;
      console.log("list", taskData);
      this.tasks = taskData.tasks;
      this.totalTask = taskData.totalCount;
      // console.log("totalTassk", taskData);
    
  
  });         
  this.userIsAuthenticated = this.authService.getAuthStatus();
  this.userId = this.authService.getUserId();
  console.log("user outside", this.userId);
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
      console.log("user", this.userId);
    });
}

onChangePage(event: PageEvent){
  // console.log(event);
  this.pageSize = event.pageSize;
  this.pageIndex = event.pageIndex;
  // console.log("pageSize",this.pageSize);
  // console.log("pageIndex",event.pageIndex);
  this.tasksService.getTasks(this.pageSize, this.pageIndex);
   
}
onDelete(id: string){
  console.log("delete", id);
  this.tasksService.deleteTask(id)
  .subscribe(r=>{
    console.log(r);
    this.tasksService.getTasks(this.pageSize,this.pageIndex);
  })
}
ngOnDestroy(){
  this.tasksSub.unsubscribe();
  this.authListenerSubs.unsubscribe();
}
}