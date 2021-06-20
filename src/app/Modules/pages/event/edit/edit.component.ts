import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { EventsService } from 'src/app/shared/Services/events.service'
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/shared/Services/auth.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Form!:FormGroup
  isSubmitted=false;
  isLoaded=false;
  imgFile:any = '';
  eventId = this.route.snapshot.params.id //gets id from url
  eventDetail:any
  imgName:any
  constructor(private fb:FormBuilder,
    private eventService:EventsService,
    private authservice:AuthService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    this.eventService.getEvent(this.eventId).subscribe(res => {
      this.eventDetail = res.data;
      this.createAddEventForm();
    });
  }

  createAddEventForm(){
    this.Form = this.fb.group({
      title:[this.eventDetail.title,Validators.required],
      host:[this.eventDetail.host,Validators.required],
      body:[this.eventDetail.body,Validators.required],
      place:[this.eventDetail.place,Validators.required],
      address:[this.eventDetail.address,Validators.required],
      startTime:[this.eventDetail.startTime,Validators.required],
      eventDate: [(this.eventDetail.eventDate.split("T"))[0],Validators.required],
      endTime:[this.eventDetail.endTime,Validators.required],
      img:[this.eventDetail.image]
    })
    this.isLoaded = true
  }

  get fvalues(){
    return this.Form.controls;
  }

  createNews(){
    this.isSubmitted=true;
    console.log(this.fvalues.title.value);
    if(this.Form.invalid){
      return
    } else {

      const formData:FormData = new FormData();
      formData.append("title",this.fvalues.title.value)
      formData.append("host",this.fvalues.host.value)
      formData.append("body",this.fvalues.body.value)
      formData.append("image",this.fvalues.img.value)
      formData.append("place",this.fvalues.place.value)
      formData.append("address",this.fvalues.address.value)
      formData.append("startTime",this.fvalues.startTime.value)
      formData.append("endTime",this.fvalues.endTime.value)
      formData.append("eventDate",this.fvalues.eventDate.value)

      this.eventService.updateEvent(formData, this.eventId).subscribe(result=>{
        if(result.status){
          // window.location.reload();
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
  }

  onImgFileChange(event:any){
    if (event.target.files.length > 0) {
      this.imgName = event.target.files[0].name
      const file = event.target.files[0];
      this.Form.get('img')!.setValue(file);

    }

  }


}
