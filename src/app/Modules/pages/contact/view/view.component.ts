import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

//services
import { ContactService } from 'src/app/shared/Services/contact.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //variables
  contactId = this.route.snapshot.params.id //gets id from url
  contactDetail:any

  constructor(
    public route:ActivatedRoute,
    private contactService:ContactService,
    public router: Router
  ) {
    this.getContactDetails();
    this.updateContactRead();
  }

  ngOnInit(): void {
  }

  //get contact details
  getContactDetails() {
    this.contactService.getContactDetail(this.contactId).subscribe((res:any) => {
      console.log(res)
      this.contactDetail = res.data
    });
  }

  //Update the message as read
  updateContactRead() {
    this.contactService.getContactMarkRead(this.contactId).subscribe(res => {
      console.log(res);
    });
  }

  //delete contact
  delete(id:any) {
    if(confirm("Are you sure want to delete?")) {
      console.log(id);
      this.contactService.getContactDelete(id).subscribe(res => {
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
      // window.location.reload();
      Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/contact']);
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
