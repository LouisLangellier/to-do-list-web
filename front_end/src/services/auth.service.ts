import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected = false
  uid!: string

  constructor() { }

  setIsConnected(){
    this.isConnected = true
  }

  getIsConnected(){
    return this.isConnected;
  }

  addUser(email: string, password: string, pseudo: string){

    this.setIsConnected()
  }

  connect(email: string, password: string){
    this.setIsConnected()
  }

  setUid(uid: string){
    this.uid = uid
  }

  getUid(){
    return this.uid;
  }
}
