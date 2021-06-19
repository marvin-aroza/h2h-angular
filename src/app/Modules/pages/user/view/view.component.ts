import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

//services
import { UserService } from 'src/app/shared/Services/user.service'

//Material import for modal
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  //variables
  adminId = this.route.snapshot.params.id //gets id from url
  adminDetail:any

  constructor(
    public route:ActivatedRoute,
    private userService:UserService,
    public router: Router
  ) {
    this.getAdminDetails();
  }

  ngOnInit(): void {
  }

  //get admin details
  getAdminDetails() {
    this.userService.getAdminById(this.adminId).subscribe(res => {
      console.log(res)
      this.adminDetail = res.data
    });
  }

  //delete user
  delete(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete the user?",
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
          this.router.navigate(['/user']);
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
