import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { EventsService } from 'src/app/shared/Services/events.service'
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/shared/Services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  Form!:FormGroup
  isSubmitted=false;
  isLoaded=false;
  imgFile:any = '';
  constructor(private fb:FormBuilder,private eventService:EventsService,private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createAddPostForm()
  }

  createAddPostForm(){
    this.Form = this.fb.group({
      title:['',Validators.required],
      host:['',Validators.required],
      body:['',Validators.required],
      place:['',Validators.required],
      address:['',Validators.required],
      startTime:['',Validators.required],
      eventDate: ['',Validators.required],
      endTime:['',Validators.required],
      img:['']
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

      this.eventService.addEvents(formData).subscribe(result=>{
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

      const file = event.target.files[0];
      this.Form.get('img')!.setValue(file);

    }

  }


}
