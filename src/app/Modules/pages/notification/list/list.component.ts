import { Component, OnInit } from '@angular/core';

//services
import { NotificationService } from 'src/app/shared/Services/notification.service'
import { ModalService } from 'src/app/shared/Services/modal.service'

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
  notifList:any;

  constructor(
    private notificationService: NotificationService,
    public router: Router,
    private modalservice:ModalService
  ) {
    this.getContactList();
  }

  ngOnInit(): void {
  }

  //get Notification List
  getContactList() {
    this.notificationService.getNotificationList().subscribe(res => {
      console.log(res);
      this.notifList = res.data;
    });
  }

  showPostOnModal(postid:any,id:any){
    this.notificationService.readNotification(id).subscribe(res => {
      console.log(res);
      this.router.navigate(['/post'], { state: { example: 'bar' } }).then(() => {
        console.log("check id",postid);
        this.modalservice.viewPost(postid);
      })
    });
  }

}
