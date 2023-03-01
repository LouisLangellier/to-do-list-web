import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected = false
  uid!: string
  username!: string

  constructor(private http: HttpClient) { }

  setIsConnected(){
    this.isConnected = true
  }

  getIsConnected(){
    return this.isConnected;
  }

  setUsername(username: string){
    this.username = username
  }

  getUsername(){
    return this.username
  }

  setUid(uid: string){
    this.uid = uid
  }

  getUid(){
    return this.uid;
  }

  addUser(email: string, password: string, username: string){
    console.log(email, password, username)
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password, username: username})
    };

    const url = "http://localhost:8080/api/users";

    fetch(url, options).then(response => {
      if(response.ok){
        return response.json()
      } else {
        throw new Error("Une erreur est survenue")
      }
    }).then(data => {
      this.setUid(data._id)
      this.setUsername(data.username)
      this.setIsConnected()
    })
    .catch(error => {
      console.error("Error ", error)
    })
  }

  connect(email: string, password: string){
    this.setIsConnected()
  }
}
