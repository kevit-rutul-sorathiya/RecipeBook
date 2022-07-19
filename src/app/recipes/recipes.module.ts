import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";
import {RecipesDetailComponent} from "./recipes-detail/recipes-detail.component";
import {RecipesItemComponent} from "./recipes-list/recipes-item/recipes-item.component";
import {RecipesStartComponent} from "./recipes-start/recipes-start.component";
import {RecipesEditComponent} from "./recipes-edit/recipes-edit.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipesStartComponent,
    RecipesEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports:[
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    RecipesStartComponent,
    RecipesEditComponent
  ]
})
export class RecipesModule{}
