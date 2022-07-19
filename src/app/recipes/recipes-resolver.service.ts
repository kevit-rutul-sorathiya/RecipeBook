import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipes} from "./recipes.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipes.service";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipes[]>{

  constructor(private dataStorageServive:DataStorageService,private recipesService:RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes=this.recipesService.getRecipes();
    if(recipes.length){
      return  this.dataStorageServive.fetchRecipes();
    }else {
      return  recipes;
    }
  }


}
