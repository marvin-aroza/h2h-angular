import { Component, OnInit } from '@angular/core';

import { PostService } from 'src/app/shared/Services/post.service'
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  isLoaded:boolean=false
  postListData:any
  no_result:any
  constructor(private postservice:PostService) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.postservice.getPostList().subscribe(result=>{
      if(result.status){
        this.postListData = result.data;
      }
    })
    console.log('this.postListData ',this.postListData);
  }
}
