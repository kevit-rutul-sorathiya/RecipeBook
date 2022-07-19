import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";


const appRoutes : Routes =[
    { path: '' , redirectTo:'/recipes' , pathMatch: 'full' },
    { path: 'auth', component:AuthComponent}
]

@NgModule({
    imports : [ RouterModule.forRoot(appRoutes),ShoppingListModule ],
    exports : [ RouterModule ]
})

export class AppRoutingModule{}
