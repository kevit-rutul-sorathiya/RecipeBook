import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[]=[];
  private subscription !: Subscription;

  constructor(private slSerivce:ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients= this.slSerivce.getIngredients();
    this.subscription=this.slSerivce.ingredientsChanged.subscribe((ingredients:Ingredients[])=>{
       this.ingredients=ingredients;
    })
  }

  onEditItem(index:number){
    this.slSerivce.startedEditing.next(index);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
