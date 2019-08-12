import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  email;
  name;
  age;
  mobile;
  error;
  show = false;
  errorText;
  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
    const id = params['id'];
    const _id = this.api.users[id]._id;
    this.api.getUser(_id).subscribe(res=>{
      const user = JSON.parse(JSON.stringify(res));
      this.email = user[0].email;
      this.name = user[0].name;
      this.age = user[0].age;
      this.mobile  = user[0].mobile_no;
    })
    })
  }
  onSubmit(user){
    this.api.updateUser(user).subscribe(res=>{
      const data = JSON.parse(JSON.stringify(res));
      this.error = data.success;
      this.errorText = data.message;
      this.show = true;
      console.log(res);
    })
  }
  Error(){
    this.show = false;
    this.router.navigateByUrl('view-all-users');
    
  }

}
