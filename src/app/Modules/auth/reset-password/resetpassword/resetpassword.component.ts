import { Component, OnInit } from '@angular/core';

import { FormGroup,FormBuilder, Validators } from '@angular/forms'

import { ResetpasswordService } from '../../../../shared/Services/resetpassword.service'
import { Router, ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  Form! : FormGroup
  isLoaded:boolean=false
  isSubmitted:boolean=false
  token = this.route.snapshot.params.token
  constructor(private fb:FormBuilder,private resetPasswordService:ResetpasswordService,private router:Router,private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.Form = this.fb.group({
      newPassword:['',Validators.required]
    })
    this.isLoaded=true
  }

  get getValues(){
    return this.Form.controls;
  }

  changePassword(){
    this.isSubmitted=true;
    if(this.Form.invalid){
      return;
    } else {
      //create request body
      let formdata={
        newPassword:this.getValues.newPassword.value,
        resettoken: this.token
      }
      this.resetPasswordService.resetPassword(formdata).subscribe(result=>{
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
