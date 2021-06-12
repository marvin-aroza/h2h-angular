import { Component, OnInit } from '@angular/core';

//services
import { NotificationService } from 'src/app/shared/Services/notification.service'

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
    public router: Router
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

}
