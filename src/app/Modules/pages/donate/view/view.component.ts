import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

//services
import { DonateService } from 'src/app/shared/Services/donate.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //variables
  requestId = this.route.snapshot.params.id //gets id from url
  donationDetail:any

  constructor(
    public route:ActivatedRoute,
    private donateService:DonateService,
    public router: Router
  ) {
    this.getDonationDetails();
  }

  ngOnInit(): void {
  }

  //get Donation request details
  getDonationDetails() {
    this.donateService.getDonationRequest(this.requestId).subscribe(res => {
      console.log(res)
      this.donationDetail = res.data[0]
    });
  }

  //confirm donation
  confirm() {
    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to confirm this donation request?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.donateService.confirmDonation(this.requestId).subscribe(res => {
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
          this.router.navigate(['/news']);
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
