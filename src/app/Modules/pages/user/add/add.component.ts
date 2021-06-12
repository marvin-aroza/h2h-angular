import { Component, OnInit } from '@angular/core';

//required imports
import { FormControl, FormBuilder, FormGroup ,Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

//services
import { UserService } from 'src/app/shared/Services/user.service'

//Material import for modal
import Swal from 'sweetalert2'

//Enums
import { Gender } from 'src/app/shared/Constants/Enums'

//custom validators
import { MustMatch } from 'src/app/shared/Validators/password_match'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //variables
  form! : FormGroup
  gender = Gender
  isLoaded:Boolean = false
  isSubmitted:Boolean = false
  title:String = 'Add Admin'
  subTitle:String = 'Create an Admin!'
  buttonText:String = 'Create Admin'
  adminId:number = this.route.snapshot.params.id //Captures the id from the url
  //adminDetails is empty for add form or else for update adminDetails are fetched from this.getAdmin() function
  adminDetails:any = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      phone: '',
      gender: null,
      role: 2
  }

  constructor(
    public fb:FormBuilder,
    private userService: UserService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    console.log(this.adminId);
    //If the form is update then change the text
    if(this.adminId) {
      console.log("dsf");
      this.title = 'Update Admin'
      this.subTitle = 'Update an Admin!'
      this.buttonText = 'Update Admin'
      this.getAdmin(); //if the form is update first need to get user details from api and then create form.. or else it will throw error saying adminDetails not found
    } else {
      //If the form is add directly call create form
      this.createForm();
    }
  }

  ngOnInit(): void {
  }

  //Create form instance
  createForm() {
    //inside this this.adminDeatils will display the value if it is for admin edit.. incase of add it will be empty as adminDetails in assigned empty
    this.form = this.fb.group({
      firstname: [this.adminDetails.firstname, Validators.required],
      lastname: [this.adminDetails.lastname, Validators.required],
      username: [this.adminDetails.username, Validators.required],
      email: [this.adminDetails.email, Validators.required],
      phone: [this.adminDetails.phone, Validators.required],
      gender: [this.adminDetails.gender, Validators.required],
      role: [this.adminDetails.role, Validators.required]
    }
    // ,{
    //   validator: MustMatch('password', 'confirm_password')
    // }
    )

    //If the form is for adding a admin then password and confirm password are need. And it can be pushed to form group using this logic
    if(!this.adminId) {
      this.form.addControl('password', new FormControl('',[Validators.required]));
      this.form.addControl('confirm_password', new FormControl('',[Validators.required]));
      // this.form.setValidators(MustMatch('password', 'confirm_password'));
    }
    this.isLoaded = true;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  addAdmin() {
    console.log(this.form);
    this.isSubmitted = true
    let formData = {
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      username: this.f.username.value,
      email: this.f.email.value,
      // password: this.f.password.value,
      phone: this.f.phone.value,
      gender: this.f.gender.value,
      role: this.f.role.value
    };

    //If the form is add admin then send password in the formdata
    if(!this.adminId) {
      Object.assign(formData, {password: this.f.password.value});
    }

    if(this.form.invalid) {
      return false;
    } else {
      //If adminId is not found that means it is add
      if(!this.adminId) {
        //call register service for add admin
        this.userService.addAdmin(formData).subscribe((res:any) => {
          console.log(res);
          this.handler(res);
        });
      } else { //Else its update user
        // Here we call service for updating the user
        this.userService.updateAdmin(formData, this.adminId).subscribe((res:any) => {
          console.log(res);
          this.handler(res);
        });
      }
      return true
    }
  }

  //get user by id
  getAdmin() {
    this.userService.getAdminById(this.adminId).subscribe(res => {
      console.log(res);
      this.adminDetails = res.data
      this.createForm();
    });
  }

  //common handler for add and update
  handler(res:any) {
    if(res.status) {
      // window.location.reload();
      Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/user']);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
