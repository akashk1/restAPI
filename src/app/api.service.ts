import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
users:any=[]
  constructor(private http:HttpClient) { }
insertData(user){
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  return this.http.post('http://localhost:3000/insert',user,{headers:headers}).pipe(tap(res=>{
    console.log(res);
  }))

}
getAllUsers(){
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  return this.http.get('http://localhost:3000/getAll',{headers:headers}).pipe(tap(res=>{
    console.log(res);
   this.users = JSON.parse(JSON.stringify(res));
   console.log(this.users);
  }))
}
getUser(id){
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  return this.http.get('http://localhost:3000/getUser/'+id,{headers:headers}).pipe(tap(res=>{
    console.log(res);
  }))
}
deleteUser(id){
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  return this.http.get('http://localhost:3000/deleteUser/'+id,{headers:headers}).pipe(tap(res=>{
    console.log(res);
  }))
}
updateUser(user){
  const headers = new HttpHeaders({'Content-type': 'application/json'});
  return this.http.post('http://localhost:3000/updateUser',user,{headers:headers}).pipe(tap(res=>{
    console.log(res);
  }))
}
}
