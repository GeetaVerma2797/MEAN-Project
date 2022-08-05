import { Component, OnInit } from '@angular/core';
import { Task } from './add/add.model';
import { AuthService } from './add/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // title = 'My First Angular Project';
  // tasks: Task[] = [];
  // onTaskAdd(t){
  //   this.tasks.push(t);
  // }
  constructor(private authService: AuthService){

  }
  ngOnInit(){
    this.authService.autoAuthUser();
  }
}
