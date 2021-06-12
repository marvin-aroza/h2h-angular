import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms'

import { AuthService } from '../../../shared/Services/auth.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Form! : FormGroup
  isLoaded:boolean=false
  isSubmitted:boolean=false
  constructor(private fb:FormBuilder,private authservice:AuthService,private router:Router) {

  }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.Form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    })
    this.isLoaded=true
  }

  get getValues(){
    return this.Form.controls;
  }

  doLogin(){
    console.log('inside do login');
    this.isSubmitted=true;
    //console.log(this.Form.controls);
    if(this.Form.invalid){
      return;
    } else {
      //create request body
      let formdata={
        email:this.getValues.email.value,
        password:this.getValues.password.value
      }
      this.authservice.login(formdata).subscribe(result=>{
        console.log({result});
        if(result.status){
          console.log('inside status true');
          // window.location.reload();
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['']);
            // this.ModalService.close();
          });
        } else {
          console.log('inside else ');
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }
  }
}
