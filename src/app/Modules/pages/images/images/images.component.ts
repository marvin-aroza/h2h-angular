import { Component, OnInit } from '@angular/core';

//required imports
import { Router, ActivatedRoute } from '@angular/router'

import { ImagesService } from 'src/app/shared/Services/images.service'

import { environment } from 'src/environments/environment';

//Material import for modal
import Swal from 'sweetalert2'

import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  isLoaded:boolean=false
  imageList:any
  no_result:any
  p:number=1
  url = environment.apiUrl

  uploadFiles:any = [];
  title:any;
  imageFiles: any = [];

  constructor(
    private imageService:ImagesService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.postList();
  }

  postList(){
    this.isLoaded = true;
    this.imageService.getImageList().subscribe(result=>{
      console.log({result});
      if(result.status){
        this.imageList = result.data.children;
        this.imageFiles.forEach((element:any) => {
          this.convertintoImage(this.url+element.path, element.name);
        });
        this.uploadFiles.push(this.imageList);
      }
    })
  }

  //delete news
  delete(id:any) {

    Swal.fire({
      icon:'warning',
      title: "Are you sure? Do you want to delete the news?",
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
        if (result.value) {
          this.imageService.getImageList(id).subscribe(res => {
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
          this.postList()
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

  download() {

    // var zip = new JSZip();
    // zip.file("Title.txt", this.title);
    // var imgFolder:any = zip.folder("images");

    // for (let i = 0; i < this.uploadFiles?.length; i++) {
    //   imgFolder.file(this.uploadFiles[i].name, this.uploadFiles[i], { base64: true });
    // }

    let counter = 0;
    this.uploadFiles[0].forEach(async (element:any) => {
      console.log(element);
      // FileSaver.saveAs(this.url+element.path, "image.jpg");
      await this.convertintoImage(this.url+element.path, element.name)
      // await imgFolder.file(element.name, await this.convertintoImage(this.url+element.path, element.name), { base64: true });
      // counter++;
      // if(this.uploadFiles[0].length == counter) {
      //   zip.generateAsync({ type: "blob" })
      //     .then(function (content) {
      //       FileSaver.saveAs(content, "Sample.zip");
      //     });
      // }
    });

  }

  convertintoImage(imageUrl:any, imageName:any) {
    let base64Image;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64data:any) => {
      console.log(base64data);
      base64Image = 'data:image/jpg;base64,' + base64data;
      this.imageFiles.push({file: base64Image, fileName: imageName})
      if(this.imageFiles.length == this.imageList.length) {
        var zip = new JSZip();
        zip.file("Title.txt", this.title);
        var imgFolder:any = zip.folder("images");

        this.imageFiles.forEach((element:any) => {
          imgFolder.file(element.fileName, (element.file).replace(/^data:image\/(png|jpg);base64,/, ""), { base64: true });
        });

        zip.generateAsync({ type: "blob" })
          .then(function (content) {
            FileSaver.saveAs(content, "Sample.zip");
          });
      }
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx:any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

}
