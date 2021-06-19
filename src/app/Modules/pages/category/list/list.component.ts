import { Component, OnInit } from '@angular/core';

//services
import { CategoryService } from 'src/app/shared/Services/category.service'

//Material import for modal
import Swal from 'sweetalert2'

//required imports
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  //variables
  categoryList: any
  p:number =1

  constructor(
    private CategoryService: CategoryService,
    public router: Router
  ) {
    this.getCategories();
   }

  ngOnInit(): void {
  }

  //get category listing
  getCategories() {
    this.CategoryService.getCategory().subscribe(res => {
      console.log(res);
      this.categoryList = res.data
    });
  }

  //delete category
  delete(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete the category?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.CategoryService.deleteCategory(id).subscribe(res => {
            console.log(res);
            if(res.status) {
              this.handler(res);
            } else {
              this.handler(res);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return
        }
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
          this.getCategories();
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
