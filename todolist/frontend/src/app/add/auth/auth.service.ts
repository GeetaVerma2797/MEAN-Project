import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { environment } from "../../../environments/environment";
const API_BASE_URL = environment.BASE_URL+'users/';

@Injectable({ providedIn: "root" })

export class AuthService {
    private token: string;
    private authStatusListener = new Subject<boolean>();
    private authStatus = false;
    tokenTimer = null;
    private userId = null;




    constructor(private http: HttpClient, private router: Router){


    }

    getAuthStatus(){
        return this.authStatus;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    getToken(){
        return this.token;
    }

    getUserId(){
        return this.userId;
    }
    createUser(authData: AuthData){
        console.log("inside createUser", authData);
        return this.http.post(API_BASE_URL+"/signup", authData)
        .subscribe((resp)=>{
            console.log("subscribe",resp);
            this.router.navigate(['/']);
        }, error=>{
            console.log("error", error);
            this.authStatusListener.next(false);

        });
    }

    autoAuthUser(){
        const authInfo = this.getAuthData();
        if(authInfo){
            const expiresIn = authInfo.expirationDate.getTime() - (new Date()).getTime();
            console.log("authInfo", authInfo, expiresIn);
            if(expiresIn>0){
                this.token = authInfo.token;
                this.authStatus = true;
                this.tokenTimer = setTimeout(()=>{
                this.logout();
                },
                expiresIn);
                this.authStatusListener.next(true);
            }
            
        }
    }
    login(authData: AuthData){
        console.log("inside createUser", authData, API_BASE_URL);
        this.http.post<{status: {}, data: {token: string, expiresIn:number, userId: string}}>(API_BASE_URL+"login", authData)
        .subscribe((resp)=>{
            console.log("subscribe",resp);
            this.token =  resp.data.token;
            if(this.token){
                const expiresIn = resp.data.expiresIn;
                this.tokenTimer = setTimeout(()=>{
                    this.logout();
                },
                expiresIn * 1000);
                const now = new Date();
                const expirationDate = new Date(now.getTime()+expiresIn*1000);
                this.userId = resp.data.userId;
                this.saveAuthData(this.token, expirationDate, this.userId);
                this.authStatusListener.next(true);
                this.authStatus = true;
                this.router.navigate(['/']);
            }
            
        }, error=>{
            console.log("login error", error);
            this.authStatusListener.next(false);

        });
    }
    logout(){
        this.token=null;
        this.userId=null;
        this.authStatus = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string){
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }
    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }
    private getAuthData(){
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");

        if(token){
            return {
                token:token,
                expirationDate:new Date(expirationDate),
                userId: userId
            }
        }
        return null;
    }
}