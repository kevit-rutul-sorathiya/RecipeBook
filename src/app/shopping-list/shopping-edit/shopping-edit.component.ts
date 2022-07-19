import {Component, OnInit, ViewChild} from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') slForm !: NgForm;
  subscription !: Subscription;
  editMode = false;
  editedItemIndex !:number;
  editedItem !:Ingredients ;

  constructor(private slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form:NgForm){
    const value=form.value;
    const newIngredient = new Ingredients(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex,newIngredient);
      this.editMode=false;
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.slService.deleteIngredients(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
