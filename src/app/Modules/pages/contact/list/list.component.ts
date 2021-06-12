import { Component, OnInit } from '@angular/core';

//services
import { ContactService } from 'src/app/shared/Services/contact.service'

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
  contactList:any

  constructor(
    private contactService: ContactService,
    public router: Router
  ) {
    this.getContactList();
  }

  ngOnInit(): void {
  }

  //get contact List
  getContactList() {
    this.contactService.getContactList().subscribe(res => {
      console.log(res);
      this.contactList = res.data;
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
          this.getContactList();
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
