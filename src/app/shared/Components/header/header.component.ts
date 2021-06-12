import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

//environment
import { environment} from 'src/environments/environment'

//Service
import { NotificationService } from 'src/app/shared/Services/notification.service'
import { ContactService } from 'src/app/shared/Services/contact.service'
import { AuthService } from 'src/app/shared/Services/auth.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Variables
  notifCount:any;
  notifList:any;
  contactCount: any
  contactList:any
  userDetail:any
  env = environment;
  test:any

  constructor(
    private notifService: NotificationService,
    private contactService: ContactService,
    private authService: AuthService
  ) {
    this.getUsrDetails();
  }

  ngOnInit(): void {
    this.getNotificationCount();
    this.getNotificationList();
    this.getContactCount();
    this.getContactList();
  }

  //get Notification count
  getNotificationCount() {
    this.notifService.getNotificationCount().subscribe(res => {
      console.log(res);
      this.notifCount = res.data
    });
  }

  //get notification list
  getNotificationList() {
    this.notifService.getNotificationList().subscribe(res => {
      console.log(res);
      this.notifList = res.data;
    });
  }

  //get contact count
  getContactCount() {
    this.contactService.getContactCount().subscribe(res => {
      console.log(res);
      this.contactCount = res.data;
    });
  }

  //get contact list
  getContactList() {
    this.contactService.getContactList().subscribe((res: any) => {
      console.log(res);
      this.contactList = res.data;
    });
  }

  //logout
  logout() {
    this.authService.logout();
  }

  //Get user details to display on header
  getUsrDetails() {
     this.authService.currentUserSubject.subscribe(res => {
       console.log(res);
      this.userDetail = res;
     });
  }

}
