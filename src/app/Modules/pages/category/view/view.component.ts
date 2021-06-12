import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

//services
import { CategoryService } from 'src/app/shared/Services/category.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //variables
  catId = this.route.snapshot.params.id //gets id from url
  catDetail:any

  constructor(
    public route:ActivatedRoute,
    private categoryService:CategoryService,
    public router: Router
  ) {
    this.getCategoryDetails();
  }

  ngOnInit(): void {
  }

  //get category details
  getCategoryDetails() {
    this.categoryService.getCategroyById(this.catId).subscribe(res => {
      console.log(res)
      this.catDetail = res.data
    });
  }

  //delete category
  delete(id:any) {
    if(confirm("Are you sure want to delete?")) {
      console.log(id);
      this.categoryService.deleteCategory(id).subscribe(res => {
        console.log(res);
        if(res.status) {
          this.handler(res);
        } else {
          this.handler(res);
        }
      });
    } else {
      console.log("no");
    }
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
