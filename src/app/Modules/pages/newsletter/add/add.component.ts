import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup,Validators } from '@angular/forms'
import { NewsletterService } from 'src/app/shared/Services/newsletter.service'
import Swal from 'sweetalert2'
import { AuthService } from 'src/app/shared/Services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  Form!:FormGroup
  isSubmitted=false;
  isLoaded=false;
  imgFile:any = '';
  imgName:any
  videoName:any

  templateNewsletter = `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Hand 2 Hand</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <style>
          .ReadMsgBody {width: 100%; background-color: #ffffff;}
          .ExternalClass {width: 100%; background-color: #ffffff;}

                  /* Windows Phone Viewport Fix */
          @-ms-viewport {
              width: device-width;
          }
      </style>

      <!--[if (gte mso 9)|(IE)]>
          <style type="text/css">
              table {border-collapse: collapse;}
              .mso {display:block !important;}
          </style>
      <![endif]-->

  </head>
  <body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" style="background: #e7e7e7; width: 100%; height: 100%; margin: 0; padding: 0;">
      <!-- Mail.ru Wrapper -->
      <div id="mailsub">
          <!-- Wrapper -->
          <center class="wrapper" style="table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
              <!-- Old wrap -->
              <div class="webkit">
                  <table cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="padding: 0; margin: 0 auto; width: 100%; max-width: 960px;">
                      <tbody>
                          <tr>
                              <td align="center">
                                  <!-- Start Section (1 column) -->
                                  <table id="intro" cellpadding="0" cellspacing="0" border="0" bgcolor="#4F6331" align="center" style="width: 100%; padding: 0; margin: 0; background-image: url(https://github.com/lime7/responsive-html-template/blob/master/index/intro__bg.png?raw=true); background-size: auto 102%; background-position: center center; background-repeat: no-repeat; background-color: #080e02">
                                      <tbody >
                                          <tr><td colspan="3" height="20"></td></tr>
                                          <tr>
                                              <td width="330" style="width: 33%;"></td>
                                              <!-- Logo -->
                                              <td width="300" style="width: 30%;" align="center">
                                                  <a  target="_blank" border="0" style="border: none; display: block; outline: none; text-decoration: none; line-height: 60px; height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif;  -webkit-text-size-adjust:none;">
                                                      HAND2HAND
                                                  </a>
                                              </td>
                                          </tr>
                                          <tr><td colspan="3" height="100"></td></tr>
                                          <!-- Main Title -->
                                          <tr>
                                              <td colspan="3" height="60" align="center">
                                                  <div border="0" style="border: none; line-height: 60px; color: #ffffff; font-family: Verdana, Geneva, sans-serif; font-size: 52px; text-transform: uppercase; font-weight: bolder;">HELLO , </div>
                                              </td>
                                          </tr>
                                          <!-- Line 1 -->
                                          <tr>
                                              <td colspan="3" height="20" valign="bottom" align="center">
                                                  <img src="https://github.com/lime7/responsive-html-template/blob/master/index/line-1.png?raw=true" alt="line" border="0" width="464" height="5" style="border: none; outline: none; max-width: 464px; width: 100%; -ms-interpolation-mode: bicubic;" >
                                              </td>
                                          </tr>
                                          <!-- Meta title -->
                                          <tr>
                                              <td colspan="3">
                                                  <table cellpadding="0" cellspacing="0" border="0" align="center" style="padding: 0; margin: 0; width: 100%;">
                                                      <tbody>
                                                          <tr>
                                                              <td width="90" style="width: 9%;"></td>
                                                              <td align="center">
                                                                  <div border="0" style="border: none; height: 60px;">
                                                                      <p style="font-size: 18px; line-height: 24px; font-family: Verdana, Geneva, sans-serif; color: #ffffff; text-align: center; mso-table-lspace:0;mso-table-rspace:0;">
                                                                      “Leadership really comes down to two fundamental things and if you get them right, then you’re 80 percent of the way there. The first one is establishing the vision for a team; the second one is establishing a culture for your organization that helps contribute to mission success.”
                                                                      </p>
                                                                  </div>
                                                              </td>
                                                              <td width="90" style="width: 9%;"></td>
                                                          </tr>
                                                      </tbody>
                                                  </table>
                                              </td>
                                          </tr>
                                          <tr><td colspan="3" height="160"></td></tr>
                                          <tr>
                                              <td width="330"></td>
                                              <!-- Button Start -->
                                              <td width="300" align="center" height="52">
                                                  <div style="background-image: url(https://github.com/lime7/responsive-html-template/blob/master/index/intro__btn.png?raw=true); background-size: 100% 100%; background-position: center center; width: 225px;">
                                                      <a  target="" width="160" height="52" border="0" bgcolor="#009789" style="border: none; outline: none; display: block; width:160px; height: 52px; text-transform: uppercase; text-decoration: none; font-size: 17px; line-height: 52px; color: #ffffff; font-family: Verdana, Geneva, sans-serif; text-align: center; background-color: #009789;  -webkit-text-size-adjust:none;">
                                                          Visit now
                                                      </a>
                                                  </div>
                                              </td>
                                              <td width="330"></td>
                                          </tr>
                                          <tr><td colspan="3" height="85"></td></tr>
                                      </tbody>
                                  </table><!-- End Start Section -->


                                  <!-- Footer -->
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div> <!-- End Old wrap -->
          </center> <!-- End Wrapper -->
      </div> <!-- End Mail.ru Wrapper -->
  </body>

  </html>`

  constructor(private fb:FormBuilder,private newsletterService:NewsletterService,private authservice:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createAddPostForm()
  }

  createAddPostForm(){
    this.Form = this.fb.group({
      body:['',Validators.required]
    })
    this.isLoaded = true
  }

  get fvalues(){
    return this.Form.controls;
  }

  createNewsletter(){
    this.isSubmitted=true;
    if(this.Form.invalid){
      return
    } else {

      let formData = {
        body : this.fvalues.body.value
      }

      this.newsletterService.addNewsletter(formData).subscribe(result=>{
        if(result.status){
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

  onImgFileChange(event:any){
    if (event.target.files.length > 0) {
      this.imgName = event.target.files[0].name
      const file = event.target.files[0];
      this.Form.get('img')!.setValue(file);

    }

  }

  onVideoFileChange(event:any){
    if (event.target.files.length > 0) {
      this.videoName = event.target.files[0].name
      const file = event.target.files[0];

      this.Form.get('video')!.setValue(file);
    }
  }

}
