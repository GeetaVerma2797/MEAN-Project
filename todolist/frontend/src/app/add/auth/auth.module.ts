import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularmaterialModule } from "src/app/angular-material.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingModule } from "./auth.routing.module";

@NgModule({
    
    declarations:[
        LoginComponent,
        SignupComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        AngularmaterialModule,
        AuthRoutingModule
    ]
})
export class AuthModule{

}