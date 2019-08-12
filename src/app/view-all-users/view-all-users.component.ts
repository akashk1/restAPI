import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.component.html',
  styleUrls: ['./view-all-users.component.css']
})
export class ViewAllUsersComponent implements OnInit {
users:any=[];
show = false;
errorText ;
error:boolean = false;
  constructor(private router:Router,private api:ApiService) { }

  ngOnInit() {
    this.api.getAllUsers().subscribe(res=>{
      this.users = res;
      console.log(res);

    })
  }
editUser(id){

 this.router.navigateByUrl('update/'+id);
}
deleteUser(id){
const _id = this.api.users[id]._id;
this.users.splice(id,1);
this.api.users.splice(id,1);
this.api.deleteUser(_id).subscribe(res=>{
  const data = JSON.parse(JSON.stringify(res));
  this.show = true;
  this.error = data.success;
  this.errorText = data.message;
})
}
Error(){
  this.show=false;
}
}
