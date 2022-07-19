import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipesStartComponent} from "./recipes-start/recipes-start.component";
import {RecipesEditComponent} from "./recipes-edit/recipes-edit.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {NgModule} from "@angular/core";

const routes:Routes=[
  { path: 'recipes' , component:RecipesComponent,canActivate:[AuthGuard] ,children:[
      {path:'' , component: RecipesStartComponent},
      {path: 'new' , component:RecipesEditComponent},
      {path:':id', component: RecipesDetailComponent, resolve:[RecipesResolverService]},
      {path: ':id/edit' , component:RecipesEditComponent, resolve:[RecipesResolverService]}
    ]},
]
@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RecipesRoutingModule{
}
