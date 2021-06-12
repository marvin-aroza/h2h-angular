import { Component, OnInit } from '@angular/core';

//required imports
import { FormControl, FormBuilder, FormGroup ,Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

//services
import { CategoryService } from 'src/app/shared/Services/category.service'

//Material import for modal
import Swal from 'sweetalert2'


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

   //variables
   form! : FormGroup
   isLoaded:Boolean = false
   isSubmitted:Boolean = false
   title:String = 'Add Category'
   subTitle:String = 'Create an Category!'
   buttonText:String = 'Create Category'
   catId:number = this.route.snapshot.params.id //Captures the id from the url
   //categoryDetails is empty for add form or else for update categoryDetails are fetched from this.getCategory() function
   categoryDetails:any = {
       name: '',
       isActive: null,
   }

   constructor(
     public fb:FormBuilder,
     private categoryService: CategoryService,
     public router: Router,
     public route: ActivatedRoute
   ) {
     console.log(this.catId);
     //If the form is update then change the text
     if(this.catId) {
       console.log("dsf");
       this.title = 'Update Category'
       this.subTitle = 'Update an Category!'
       this.buttonText = 'Update Category'
       this.getCategory(); //if the form is update first need to get category details from api and then create form.. or else it will throw error saying categoryDetails not found
     } else {
       //If the form is add directly call create form
       this.createForm();
     }
   }

   ngOnInit(): void {
   }

   //Create form instance
   createForm() {
     //inside this this.categoryDetails will display the value if it is for admin edit.. incase of add it will be empty as categoryDetails in assigned empty
     this.form = this.fb.group({
       name: [this.categoryDetails.name, Validators.required],
       isActive: [this.categoryDetails.isActive, Validators.required],
     })
     this.isLoaded = true;
   }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

   addAdmin() {
     console.log(this.form);
     this.isSubmitted = true
     let formData = {
       name: this.f.name.value,
       isActive: this.f.isActive.value,
     };


     if(this.form.invalid) {
       return false;
     } else {
       //If catId is not found that means it is add
       if(!this.catId) {
         //call category service for add category
         this.categoryService.addCategory(formData).subscribe((res:any) => {
           console.log(res);
           this.handler(res);
         });
       } else { //Else its update category
         // Here we call service for updating the category
         this.categoryService.updateCategory(formData, this.catId).subscribe((res:any) => {
           console.log(res);
           this.handler(res);
         });
       }
       return true
     }
   }

   //get cat by id
   getCategory() {
     this.categoryService.getCategroyById(this.catId).subscribe(res => {
       console.log(res);
       this.categoryDetails = res.data
       this.createForm();
     });
   }

   //common handler for add and update
   handler(res:any) {
     if(res.status) {
       Swal.fire({
           icon: 'success',
           title: res.message,
           showConfirmButton: false,
           timer: 1500
         }).then(() => {
           this.router.navigate(['/category']);
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
