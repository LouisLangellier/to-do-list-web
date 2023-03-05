import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  convertDateToNumber(date: Date){
    return date.getTime()
  }

  convertNumberToDate(date: number){
    return new Date(date)
  }
}


