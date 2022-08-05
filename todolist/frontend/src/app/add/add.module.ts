import { NgModule } from "@angular/core";
import { CreateTaskComponent } from "src/app/tasks/create/create.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularmaterialModule } from "src/app/angular-material.module";
import { ListComponent } from "./htmlpage/list/list.component";

@NgModule({
    
    declarations:[
        CreateTaskComponent,
        ListComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        AngularmaterialModule
    ]
})
export class AddModule{

}