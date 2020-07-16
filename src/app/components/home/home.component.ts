import { SignUpComponent } from './../../modals/sign-up/sign-up.component';
import { ValidateUserComponent } from './../../modals/validate-user/validate-user.component'
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpenClose: boolean = false;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openCloseModal() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { top: '50px'}
    dialogConfig.data ={ id:1, title:'Registrate'}    

    const dialogRef = this.dialog.open(SignUpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // console.log('data modal: ', res)
    })
  }

  openModalvalidate(){
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = { top: '50px'}
    dialogConfig.data ={ id:2, title:'valida'}    

    const dialogRef = this.dialog.open(ValidateUserComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res => {
      // console.log('data modal: ', res)
    })
  }

}
