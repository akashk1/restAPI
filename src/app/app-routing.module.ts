
import { NgModule } from "@angular/core";
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ViewAllUsersComponent } from "./view-all-users/view-all-users.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
const appRoutes:Routes=[
    {path:'',component:HomeComponent},
    {
        path:'home',component:HomeComponent
    },{
        path:'view-all-users',component:ViewAllUsersComponent
    },{
        path:'update/:id',component:UpdateUserComponent
    }
]
@NgModule(
    {
        imports:[RouterModule.forRoot(appRoutes)],
        exports:[RouterModule]

    }
)
export class AppRouting{

}