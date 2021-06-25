import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

import { DonateService } from 'src/app/shared/Services/donate.service'
import { CategoryService } from 'src/app/shared/Services/category.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoaded:boolean=false
  postListData:any
  no_result:any
  p:number=1
  categoryList:any = []
  filter:any = ''
  constructor(
    private donateService:DonateService,
    private CategoryService: CategoryService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getCategories()
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.donateService.getDonateList(this.filter).subscribe(result=>{
      console.log({result});
      if(result.status){
        this.postListData = result.data;
      }
    })
  }

  //get category listing
  getCategories() {
    this.CategoryService.getCategory().subscribe(res => {
      console.log(res);
      this.categoryList = res.data
    });
  }

  changeFilter(event:any) {
    this.filter = event.value
    this.postList();
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
          this.postList()
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
