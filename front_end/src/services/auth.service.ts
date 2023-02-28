import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected = false

  constructor() { }

  setIsConnected(){
    this.isConnected = true
  }

  getIsConnected(){
    return this.isConnected;
  }

  addNewUser(email: string, password: string, pseudo: string){
    
    this.setIsConnected()
  }
}
