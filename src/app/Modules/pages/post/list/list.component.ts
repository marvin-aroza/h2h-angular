import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog'
import { PostService } from 'src/app/shared/Services/post.service'
import { ModalService } from '../../../../shared/Services/modal.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoaded:boolean=false
  postListData:any
  no_result:any
  filter:any = null
  p:number = 1;

  constructor(
    private postservice:PostService,
    private dialog:MatDialog,
    private modalservice:ModalService
    ) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.postservice.getPostList(this.filter).subscribe(result=>{
      console.log({result});
      if(result.status){
        this.postListData = result.data;
      }
    })
  //  console.log('this.postListData ',this.postListData);
  }

  showPostOnModal(id:any){
    //console.log({id});
    if(this.postListData){
      this.modalservice.viewPost(id);
    }
  }
}
