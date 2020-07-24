import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable
(
    {
        providedIn: 'root'
    }
)
export class ErrordialogserviceService 
{
    public isDialogOpen: Boolean = false;
    constructor(public dialog: MatDialog) { }
    
    openDialog(data): any 
    {
        if (this.isDialogOpen) 
        {
            return false;
        }
        this.isDialogOpen = true;
        const dialogRef = this.dialog.open(ErrordialogserviceService, 
        {
            width: '300px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => 
        {
            console.log('The dialog was closed');
            this.isDialogOpen = false;
            let animal;
            animal = result;
        });
    }
}
