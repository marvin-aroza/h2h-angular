import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'

//services
import { EventsService } from 'src/app/shared/Services/events.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

   //variables
   eventId = this.route.snapshot.params.id //gets id from url
   eventDetail:any

   constructor(
     public route:ActivatedRoute,
     private eventService:EventsService,
     public router: Router
   ) {
     this.getEventDetails();
   }

   ngOnInit(): void {
   }

   //get events details
   getEventDetails() {
     this.eventService.getEvent(this.eventId).subscribe(res => {
       console.log(res)
       this.eventDetail = res.data
     });
   }

   //delete Events
   delete(id:any) {

     Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete the event?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.eventService.deleteEvent(id).subscribe(res => {
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
           this.router.navigate(['/event']);
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
