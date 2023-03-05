import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }


  addTask(title: string, description: string, category: string, status: string, date: number){
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: title, description: description, category: category, status: status, date: date, done: false})
    };

    const url = "http://localhost:8080/api/task";

    fetch(url, options).then(response => {
      if(response.ok){
        return response.json()
      } else {
        throw new Error("Une erreur est survenue")
      }
    }).then(data => {
      console.log(data)
      // this.setUid(data._id)
      // this.setUsername(data.username)
      // this.setIsConnected()
    })
    .catch(error => {
      console.error("Error ", error)
    })
  }
}
