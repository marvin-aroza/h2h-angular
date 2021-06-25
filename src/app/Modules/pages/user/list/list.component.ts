import { Component, OnInit } from '@angular/core';

//services
import { UserService } from 'src/app/shared/Services/user.service'

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
  adminList: any
  p:number=1
  filter:any = null

  constructor(
    private userService: UserService,
    public router: Router
  ) {
    this.getAdmins();
   }

  ngOnInit(): void {
  }

  //get admin listing
  getAdmins() {
    this.userService.getUsers(this.filter).subscribe(res => {
      console.log(res);
      this.adminList = res.data
    });
  }

  changeFilter(event:any) {
    this.filter = event.value
    this.getAdmins();
  }

  //delete user
  delete(id:any) {
    Swal.fire({
      icon:'warning',
      title: 'Are you sure? Do you want to delete the user?',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.userService.deleteAdmin(id).subscribe(res => {
            console.log(res);
            if(res.status) {
              this.handler(res);
            } else {
              this.handler(res);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return
        }
    });
  }

  //Mark inactive user
  markInactive(id:any, status:any) {
    let message = 'Are you sure you want to mark user active?';
    let changeStatus = true;
    if(status) {
      message = 'Are you sure you want to mark user inactive?'
      changeStatus = false;
    }
    let formData = {
      isActive: changeStatus
    }


    Swal.fire({
      icon:'warning',
      title: message,
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.userService.markStatusAdmin(id, formData).subscribe(res => {
            console.log(res);
            if(res.status) {
              this.handler(res);
            } else {
              this.handler(res);
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return
        }
    });
  }

  //common handler for add and update
  handler(res:any) {
    if(res.status) {
      // window.location.reload();
      Swal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // this.router.navigate(['/user']);
          this.getAdmins();
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
