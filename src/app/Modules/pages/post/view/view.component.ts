import { Component, OnInit, Optional,Inject, ViewChild, ElementRef } from '@angular/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router'

import { MatDialog,MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog'
import { PostService } from 'src/app/shared/Services/post.service'
import { ModalService } from '../../../../shared/Services/modal.service'

//environment
import { environment } from 'src/environments/environment'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  isModalLoaded:boolean=false
  postData:any
  env = environment;
  postId:any = '';
  isEditClicked:Boolean = false
  @ViewChild("comment") comment!: ElementRef;

  constructor(
    private rtr:Router,
    private dialog:MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
    private postservice:PostService,
    private ModalService:ModalService
    ) { }

  ngOnInit(): void {
    this.postId=this.data.postid;
    this.getPostDetailById(this.postId);
  }

  getPostDetailById(id:any){


    //console.log('id in view component',id)
    if(id){
      this.postservice.getPostById(id).subscribe(result=>{
        if(result.status){
          this.postData = result.data[0];
          this.isModalLoaded=true;
        }
      })
    }
  }

  uploadPost(){
    Swal.fire({
      icon:'warning',
      title: 'Are you sure? Do you want to accept the post and upload it on site?',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.changeStatusOfPost('accept');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return
        }
    });

  }
  rejectPost(){
    Swal.fire({
      icon:'warning',
      title: 'Are you sure? Do you want to reject the post?',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.changeStatusOfPost('reject');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return
        }
    });
  }

  changeStatusOfPost(status:string){

    this.postservice.updatePostStatus(this.postId,status).subscribe(res=>{
        if(res.status){
          Swal.fire({
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.ModalService.close();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
    })
  }

  addCommentsToPost(){
    let formdata = {
      comment : this.comment.nativeElement.value
    }
    this.postservice.addCommentOnPost(this.postId,formdata).subscribe(res=>{
      if(res.status){
        Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.ModalService.close();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
}
