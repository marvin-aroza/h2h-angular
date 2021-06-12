import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

//service
import { UserService } from 'src/app/shared/Services/user.service'
import { AuthService } from 'src/app/shared/Services/auth.service'
import { ReloadService } from 'src/app/shared/Services/reload.service'

//Enums
import { Gender } from 'src/app/shared/Constants/Enums'

//Material import for modal
import Swal from 'sweetalert2'

//environment
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //variable
  userDetails:any
  user:any
  Form!:FormGroup
  formLoaded:boolean = false

  firstnameField:boolean = false;
  lastnameField:boolean = false;
  emailField:boolean = false;
  usernameField:boolean = false;
  phoneField:boolean = false;
  genderField:boolean = false;
  valueChanged:boolean = false;
  isFormSubmitted:boolean = false;

  gender = Gender
  env = environment;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private reloadService: ReloadService,
    private fb:FormBuilder
  ) {
    this.getUserLoggedinDetails();
  }

  ngOnInit(): void {
  }

  //Create the form instance
  createForm() {
    this.Form = this.fb.group({
      first_name: [this.user.firstname, Validators.required],
      last_name: [this.user.lastname, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, Validators.required],
      gender: [this.user.gender, Validators.required],
    })
    this.formLoaded = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.Form.controls; }

  getUserLoggedinDetails() {
    this.userDetails = this.authService.getUserDetails();
    this.getUserDetails();
  }

  //get user details
  getUserDetails() {
    this.userService.getAdminById(this.userDetails.id).subscribe(res => {
      console.log(res);
      this.user = res.data
      this.createForm();
      this.authService.currentUserSubject.next(this.user);
      this.setProfileinLocalStorage();
    });
  }

  //save profile changes
  saveProfile() {
    console.log(this.Form);

    this.isFormSubmitted = true;

    if (this.Form.invalid) {
      return;
    } else {
      //request body for Profile change
      let formData = {
        firstname: this.f.first_name.value,
        lastname: this.f.last_name.value,
        username: this.f.username.value,
        email: this.f.email.value,
        phone: this.f.phone.value,
        gender: this.f.gender.value
      }

      //User service call to send request to server
      this.userService.updateAdmin(formData, this.userDetails.id).subscribe(res => {
        console.log(res);
        if(res.status) {
          Swal.fire({
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.valueChanged = false;
              this.enableFields('');
              this.getUserDetails();
            });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }

  //@vaibhavi see if you can write a better logic here
  //enable fields to edit
  enableFields(field:any) {
    this.firstnameField = false;
    this.lastnameField = false;
    this.emailField = false;
    this.usernameField = false;
    this.phoneField = false;
    this.genderField = false;
    this.resetForm();
    if(field == 'firstname') {
      this.firstnameField = true;
    } else if(field == 'lastname') {
      this.lastnameField = true;
    } else if(field == 'username') {
      this.usernameField = true;
    } else if(field == 'gender') {
      this.genderField = true;
    } else if(field == 'phone') {
      this.phoneField = true;
    } else if(field == 'email') {
      this.emailField = true;
    }
  }

  //reset form to default
  resetForm() {
    let formData = {
      first_name: this.user.firstname,
      last_name: this.user.lastname,
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
      gender: this.user.gender,
    }
    this.Form.reset(formData);
  }

  //upload profile image
  profileImageUpload(event:any) {
    const file = (event.target as HTMLInputElement).files![0];
    console.log(file);
    // this.form.patchValue({
    //   avatar: file
    // });
    // this.form.get('avatar').updateValueAndValidity()
    const formData = new FormData()
    formData.append('profImage', file);
    this.userService.updateProfileImage(this.userDetails.id, formData).subscribe(res => {
      console.log(res);
      if(res.status) {
        Swal.fire({
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.valueChanged = false;
            this.enableFields('');
            this.getUserDetails();
            this.reloadService.reloadNewLogic();
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  //st profile image in local storage
  setProfileinLocalStorage() {
    this.authService.changedUserDetails(this.user);
  }

}
