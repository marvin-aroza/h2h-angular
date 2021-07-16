import { Component, OnInit } from '@angular/core';

//Service
import { ModalService } from 'src/app/shared/Services/modal.service'

import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-redirect',
  templateUrl: './view-redirect.component.html',
  styleUrls: ['./view-redirect.component.css']
})
export class ViewRedirectComponent implements OnInit {

  postid = this.route.snapshot.params.id
  constructor(
    private modalservice:ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showPostOnModal();
  }

  showPostOnModal(){
      this.router.navigate(['/post'], { state: { example: 'bar' } }).then(() => {
        console.log("check id",this.postid);
        this.modalservice.viewPost(this.postid);
      })
  }

}
