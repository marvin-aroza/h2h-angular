import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

import { NewsletterService } from 'src/app/shared/Services/newsletter.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoaded:boolean=false
  newsletterListData:any
  no_result:any
  p:number=1
  constructor(
    private newsletterService:NewsletterService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.newsletterService.getNewsletterList().subscribe(result=>{
      console.log({result});
      if(result.status){
        this.newsletterListData = result.data;
      }
    })
  }

  //delete news
  delete(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete this newsletter?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.newsletterService.deleteNewsletter(id).subscribe(res => {
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

  sendNewsletter(id:any) {
    this.newsletterService.sendNewsletter(id).subscribe(result=>{
      if(result.status){
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          showConfirmButton: false,
          timer: 3000
        });
      }
    })
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
