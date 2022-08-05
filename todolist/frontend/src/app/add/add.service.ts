import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "./add.model";

import { environment } from "src/environments/environment";
const API_BASE_URL = environment.BASE_URL + "tasks/"


@Injectable({providedIn: "root"})
export class TasksService{
    private tasks: Task[] = [];
    private tasksUpdated= new Subject<{tasks:Task[],totalCount:number}>();

    constructor(private http: HttpClient, private router: Router){
        // this.http.get<{status: {}, data: Task[]}>('http://localhost:3000/api/tasks').
        // subscribe((taskData)=>{
        //     this.tasks = taskData.data;
        //     this.tasksUpdated.next([...this.tasks]);
        // })
    }
    
    getTasks(taskPerPage?:number, currentPage?: number) {
        let url = API_BASE_URL;
        console.log("inside gettasks", taskPerPage , currentPage)
        if(taskPerPage && (currentPage > -1)){
            console.log("if condition",(taskPerPage && (currentPage > -1)) )
            url += `?pagesize=${taskPerPage}&currentpage=${currentPage}`; //url=url+``;
            
        }
        console.log(url);
        this.http.get<{status: {}, data: Task[], totalcount:number}>(url)
            .subscribe((taskData)=>{
                console.log("getTask totacount: ", taskData, taskData['totalCount']);
                this.tasks = taskData.data;
                this.tasksUpdated.next({tasks:[...this.tasks],totalCount:taskData['totalCount']});
            })
    }
    // edit
    getTask(id: string){ 
        // console.log('control is coming here');
        
        return this.http.get<{status: {}, data: Task}>(API_BASE_URL +id);
    }
    updateTask(task: Task){
        
        console.log("task inside updateTask :: ", task);
        let taskData = null;
        if(typeof(task.imagePath)=='string'){
            taskData = task;
            console.log("task inside updateTask image:: ", taskData);

        } 
        else {
            taskData = new FormData();
            taskData.append("_id", task._id);
            taskData.append("title", task.title);
            taskData.append("description", task.description);
            taskData.append('image', task.imagePath, task.title);
            console.log("task inside updateTask nott image:: ", taskData);


        }
        console.log("taskData : ", taskData)
        this.http.put<{status:{},data:Task}>(API_BASE_URL + task._id,taskData)
        .subscribe((resp)=>{
        console.log("resp",resp);
        // // console.log(task);
        // let index = this.tasks.findIndex(t=>t._id == task._id);
        // if(index > -1){
        //     this.tasks[index]=task;
        //     this.tasksUpdated.next([...this.tasks]);

        // }
        this.router.navigate(['/']);
        })
    }
    getTaskUpdateListener(){
        return this.tasksUpdated.asObservable();
    }

    // addTasks(task: Task){
    //     this.http.post<{status: {}, data: Task}>('http://localhost:3000/api/tasks', task)
    //     .subscribe((resp)=>{
    //         console.log(resp);
    //         this.tasks.push(resp.data);
    //         this.getTasks();
    //         this.tasksUpdated.next([...this.tasks]);
    //         this.router.navigate(['/']);
    //     });
        
    // }
    addTasks(task: Task, image:File){
        const taskData = new FormData();
        
        taskData.append("title", task.title);
        taskData.append("description", task.description);
        taskData.append('image', image, task.title);

        console.log(taskData);


        this.http.post<{status: {}, data: Task}>(API_BASE_URL, taskData)
        .subscribe((resp)=>{
            console.log(resp);
            // this.tasks.push(resp.data);
            // this.getTasks();
            // this.tasksUpdated.next([...this.tasks]);
            this.router.navigate(['/']);
        });
        
    }
    deleteTask(id: string){
        let url =API_BASE_URL + id;
        console.log(url);
        
        return this.http.delete(API_BASE_URL+id);
        // .subscribe((res)=>{
        //     // console.log(res)
        //     // this.tasks = this.tasks.filter(task => task._id != id);
        //     // this.tasksUpdated.next([...this.tasks]);
        //     // this.router.navigate(['/']);
        // })
    }
}