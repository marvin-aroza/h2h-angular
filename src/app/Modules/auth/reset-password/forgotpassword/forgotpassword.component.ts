import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms'

import { ResetpasswordService } from '../../../../shared/Services/resetpassword.service'
import { AuthService } from '../../../../shared/Services/auth.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  Form! : FormGroup
  isLoaded:boolean=false
  isSubmitted:boolean=false
  constructor(
    private fb:FormBuilder,
    private authservice:AuthService,
    private router:Router,
    private passwordResetService: ResetpasswordService
    ) {

  }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.Form = this.fb.group({
      email:['',[Validators.required, Validators.email]]
    })
    this.isLoaded=true
  }

  get getValues(){
    return this.Form.controls;
  }

  resetPassword(){
    this.isSubmitted=true;
    if(this.Form.invalid){
      return;
    } else {
      //create request body
      let formdata={
        email:this.getValues.email.value
      }
      this.passwordResetService.resetPasswordLink(formdata).subscribe(result=>{
        console.log({result});
        if(result.status){
          Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Reset Password Failed!',
            showConfirmButton: false,
            timer: 3000
          });
        }
      })
    }
  }

}
