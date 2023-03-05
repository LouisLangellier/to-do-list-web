import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/services/database.service';
import { UtilService } from 'src/services/util.service';
import { status } from './status';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(NewTaskDialog);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: 'new-task-dialog',
  templateUrl: 'new-task-dialog.html',
  styleUrls: ['./new-task-dialog.scss'],
})
export class NewTaskDialog {
  status = status;

  titleControl = new FormControl();
  descControl = new FormControl();
  categoryControl = new FormControl();
  statusControl = new FormControl();
  datePicker!: Date;

  constructor(private database: DatabaseService, private util: UtilService) {}

  addTask() {
    let date = this.util.convertDateToNumber(this.datePicker);
    this.database.addTask(
      this.titleControl.value,
      this.descControl.value,
      this.categoryControl.value,
      this.statusControl.value,
      date
    );
  }
}
