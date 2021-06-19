import { Injectable } from '@angular/core';

import { ViewComponent } from '../../Modules/pages/post/view/view.component'

//Import modal dialog material
import { MatDialog } from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog:MatDialog) { }

  viewPost(postId:any):void{
    this.dialog.closeAll();//Will close all opened modals

    const dialogRef= this.dialog.open(ViewComponent, {
      backdropClass:'backdropBackground',
      width: '950px',
      height : '680px',
      data:{postid:postId,name:'google',animal:''}
    })

    dialogRef.afterClosed().subscribe((result: { food: any; }) => {
      console.log('The dialog was closed', result);
    });
  }
  close() {
    this.dialog.closeAll(); // This line close all existing open modals
  }
}
