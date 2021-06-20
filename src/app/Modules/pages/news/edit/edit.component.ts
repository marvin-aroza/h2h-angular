import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NewsService } from 'src/app/shared/Services/news.service'
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/shared/Services/auth.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  Form!: FormGroup
  isSubmitted = false;
  isLoaded = false;
  imgFile: any = '';
  newsId:any  = this.route.snapshot.params.id
  newsDetail:any
  imgName:any
  videoName:any

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getNewsDetails();
  }

  //get news details
  getNewsDetails() {
    this.newsService.getNews(this.newsId).subscribe(res => {
      console.log(res)
      this.newsDetail = res.data
      this.createAddPostForm()
    });
  }

  createAddPostForm() {
    this.Form = this.fb.group({
      title: [this.newsDetail.title, Validators.required],
      subtitle: [this.newsDetail.subtitle],
      body: [this.newsDetail.body],
      img: [this.newsDetail.image],
      video: [this.newsDetail.video]
    })
    this.isLoaded = true
  }

  get fvalues() {
    return this.Form.controls;
  }

  createNews() {
    this.isSubmitted = true;
    console.log(this.fvalues.title.value);
    if (this.Form.invalid) {
      return
    } else {

      const formData: FormData = new FormData();
      formData.append("title", this.fvalues.title.value)
      formData.append("subtitle", this.fvalues.subtitle.value)
      formData.append("body", this.fvalues.body.value)
      formData.append("image", this.fvalues.img.value)
      formData.append("video", this.fvalues.video.value)

      this.newsService.updateNews(formData, this.newsId).subscribe(result => {
        if (result.status) {
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

  onImgFileChange(event: any) {
    console.log("image");
    if (event.target.files.length > 0) {
      this.imgName = event.target.files[0].name
      const file = event.target.files[0];
      this.Form.get('img')!.setValue(file);

    }

  }

  onVideoFileChange(event: any) {
    console.log("video");
    if (event.target.files.length > 0) {
      this.videoName = event.target.files[0].name
      const file = event.target.files[0];

      this.Form.get('video')!.setValue(file);
    }
  }

}
