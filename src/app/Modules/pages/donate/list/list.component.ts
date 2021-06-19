import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

import { DonateService } from 'src/app/shared/Services/donate.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoaded:boolean=false
  donationRequestData:any
  no_result:any
  p:number=1
  constructor(
    private donateService:DonateService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.donationRequestList();
  }

  donationRequestList(){
    this.isLoaded = true;
    this.donateService.getDonationRequestList().subscribe(result=>{
      console.log({result});
      if(result.status){
        this.donationRequestData = result.data;
      }
    })
  }

  // //delete news
  // delete(id:any) {
  //   if(confirm("Are you sure want to delete?")) {
  //     console.log(id);
  //     this.newsService.deleteNews(id).subscribe(res => {
  //       console.log(res);
  //       if(res.status) {
  //         this.handler(res);
  //       } else {
  //         this.handler(res);
  //       }
  //     });
  //   } else {
  //     console.log("no");
  //   }
  // }

  // //common handler for add and update
  // handler(res:any) {
  //   if(res.status) {
  //     // window.location.reload();
  //     Swal.fire({
  //         icon: 'success',
  //         title: res.message,
  //         showConfirmButton: false,
  //         timer: 1500
  //       }).then(() => {
  //         this.postList()
  //       });
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: res.message,
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  // }

}
