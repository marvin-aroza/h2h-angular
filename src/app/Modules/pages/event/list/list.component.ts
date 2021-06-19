import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

import { EventsService } from 'src/app/shared/Services/events.service'

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
  filter:any
  p:number=1
  constructor(
    private eventService:EventsService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.eventService.getEventList(this.filter).subscribe(result=>{
      console.log({result});
      if(result.status){
        this.postListData = result.data;
      }
    })
  }

  changeFilter(filter:any) {
    console.log(filter.value);
    this.filter = filter.value;
    this.postList()
  }

  //delete Event
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

  markCompleteEvent(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to mark this event as complete?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.eventService.markEventCompleted(id).subscribe(res => {
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
