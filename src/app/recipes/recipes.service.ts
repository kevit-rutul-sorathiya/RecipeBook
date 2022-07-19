import { Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipes } from "./recipes.model";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
    recipesChanged = new Subject<Recipes[]>();

    // private recipes : Recipes[] = [
    //
    //     new Recipes('Recipe 1',
    //                 'This is a simply test',
    //                 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
    //                 [
    //                     new Ingredients('Meat',1),
    //                     new Ingredients('French Fries',20)
    //                 ]),
    //     new Recipes('Recipe 2',
    //                 'it`s very testy',
    //                 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzejB0_pO9NbGrUr_wUUwZ_UF8ojPwGiVKw&usqp=CAU',
    //                 [
    //                     new Ingredients('Meat',1),
    //                     new Ingredients('Buns',2)
    //                 ])
    //   ];

  private recipes : Recipes[]=[];
    constructor(private slService:ShoppingListService){}

    setRecipes(recipes: any){
      this.recipes=recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice()
    }

    getRecipe(index:number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients:Ingredients[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe:Recipes){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number,newRecipe:Recipes){
        this.recipes[index]=newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
