import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingredients } from "../shared/ingredients.model"

export class ShoppingListService{
    ingredientsChanged = new EventEmitter<Ingredients[]>();
    startedEditing = new Subject<number>();

    ingredients: Ingredients[] = [
        new Ingredients('Apples',5),
        new Ingredients('Tomato',5)
    ]

    getIngredients(){
        return this.ingredients.slice()
    }

    getIngredient(index:number){
      return this.ingredients[index];
    }

    addIngredient(ingredient:Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients:Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index:number , newIngredient: Ingredients){
        this.ingredients[index]=newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredients(index:number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}
