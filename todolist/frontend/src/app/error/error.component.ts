import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  message = "Unkonwn Error Occurred!!";
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.message = data.message;
  }

  ngOnInit(): void {
  }

}
