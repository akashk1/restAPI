import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
show:boolean = false;
error:boolean = false;
errorText;
  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  onSubmit(user){
    this.api.insertData(user).subscribe(res=>{
      const data = JSON.parse(JSON.stringify(res));
      console.log(data.success+' '+data.message);
      this.show = true;
      this.error = data.success;
      this.errorText = data.message;
    })
  }
  Error(){
    this.show = false;
  }
}