import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Task } from "../add.model";
import { TasksService } from "../add.service";
import { imageTypeValidator } from './image-type.validator';
@Component({
    selector: 'add-html-page',
    templateUrl: './htmlpage.component.html',
    styleUrls: ['./htmlpage.component.scss']

})
export class AddHtmlPageComponents implements OnInit{

    dear = "Hello";
    wlcmMsg = "";
    test = "";
    console;
    enteredTitle = "";
    enteredDescription = "";
    // @Output() taskCreated = new EventEmitter<Task>();
    alert;
    mode = 'create';
    private taskId:string = null;
    task :Task;
    taskForm: FormGroup;
    isLoading = false;
    imagePreview = null;
    constructor(private tasksService: TasksService, public route:ActivatedRoute){
        this.console = window.console;
        this.alert = window.alert;
    }
    ngOnInit(){
        
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has("taskId")){
                this.taskForm = new FormGroup({
                    'title': new FormControl(null, {validators: [Validators.required]}),
                    'description': new FormControl(null, {validators: [Validators.required, Validators.minLength(100)]}),
                    'image': new FormControl(null, {validators: [Validators.required]})
        
                })
                console.log('some girbis');
                this.mode = 'edit';
                this.taskId = paramMap.get('taskId');
                this.isLoading = true;
                this.tasksService.getTask(this.taskId).subscribe((resp)=>{

                    console.log('log from 36');
                    this.isLoading = false;
                    this.task = resp.data;
                    console.log("image", this.task.imagePath);
                    this.taskForm.setValue({
                        'title': this.task.title,
                        'description': this.task.description,
                        'image': this.task.imagePath
                    })
                })
            } else {
                this.taskForm = new FormGroup({
                    'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(5)]}),
                    'description': new FormControl(null, {validators: [Validators.required]}),
                    'image': new FormControl(null, {validators: [Validators.required, imageTypeValidator]})
        
                })
                console.log("dfgdgf",this.taskForm);
                this.mode = 'create';
                this.taskId = null;
                this.task = {
                    title: '',
                    description: '',
                    imagePath: '',
                    creator: ''
                };
            }
        })
    }
    // image function
    onImagePicked(event: Event){
        console.log("type of variable", typeof(this.taskForm.value.image));
        const file = (event.target as HTMLInputElement).files[0];
        this.taskForm.patchValue({image: file});
        this.taskForm.get('image').updateValueAndValidity();

        this.imageToDataUrl(file);
        console.log(this.taskForm, file);
    }

    imageToDataUrl(file: File){
        const reader = new FileReader();
        reader.onload = ()=>{
            this.imagePreview = reader.result;
        }
        reader.readAsDataURL(file);
    }

    onSaveTask(){
        this.taskForm.markAllAsTouched();
        if(!this.taskForm.valid){
            console.log("geeta");
            return;
            
        }
        const task: Task = {
            // title: this.enteredTitle,
            // description: this.enteredDescription
            _id: this.task._id || null,
            title: this.taskForm.value.title,
            description: this.taskForm.value.description,
            imagePath: this.taskForm.value.image,
            creator: ''
        };
        console.log("edit save Task", this.mode);
        if(this.mode=='edit'){
            console.log("inside editing  task : ",  this.task);
             this.tasksService.updateTask(task);
        } else {
            console.log("inside adding  task : ",  task);
            this.tasksService.addTasks(task, this.taskForm.value.image);
        }
        // this.taskCreated.emit(task);
        
        this.taskForm.reset();
    }
    onClickButton(){
        this.wlcmMsg="This is welcome message!";
        this.dear="Dear";
        
        
        return false;
    }
    onFocusButton(test: any){
        alert("Focus event called "+test)
        return test;
    }
    onHoverButton(){
        alert("Hover Event called")
    }
}