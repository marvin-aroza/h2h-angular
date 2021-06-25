import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

//services
import { NewsletterService } from 'src/app/shared/Services/newsletter.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //variables
  newsletterId = this.route.snapshot.params.id //gets id from url
  newsletterDetail:any

  constructor(
    public route:ActivatedRoute,
    private newsletterService:NewsletterService,
    public router: Router
  ) {
    this.getNewsDetails();
  }

  ngOnInit(): void {
  }

  //get news details
  getNewsDetails() {
    this.newsletterService.getNewsletter(this.newsletterId).subscribe(res => {
      console.log(res)
      this.newsletterDetail = res.data
    });
  }

  //delete news
  delete(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete the news?",
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
          this.router.navigate(['/newsletter']);
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
