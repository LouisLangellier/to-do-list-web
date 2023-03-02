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

  existingEmail(email: string): Promise<boolean> {
    const url = `http://localhost:8080/api/users/email/${email}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data[0] == undefined) {
          return false;
        } else {
          return true;
        }
      })
      .catch(error => {
        console.error(error);
        return false;
      });
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

  connect(email: string, password: string): Promise<boolean>{
    const url = `http://localhost:8080/api/users/email/${email}/password/${password}`;
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data[0] == undefined) {
          return false
        } else {
          this.setIsConnected()
          this.setUid(data[0]._id)
          this.setUsername(data[0].username)
          return true
        }
      })
      .catch(error => {
        console.error(error);
        return false
      });
  }
}
