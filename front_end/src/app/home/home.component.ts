import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { status } from './status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private dialog: MatDialog){}

  openDialog() {
    const dialogRef = this.dialog.open(NewTaskDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'new-task-dialog',
  templateUrl: 'new-task-dialog.html',
  styleUrls: ['./new-task-dialog.scss']
})
export class NewTaskDialog {

  status = status

  titleControl = new FormControl()
  descControl = new FormControl()
  categoryControl = new FormControl()
  statusControl = new FormControl()
  datePicker!: Date;

  addTask(){
    console.log(this.titleControl.value)
  }
  

}
