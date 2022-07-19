import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipes } from '../../recipes.model';
import { RecipeService } from '../../recipes.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input() index!:number;
  @Input() recipe : Recipes = {
    name: "",
    description: "",
    imagePath: "",
    ingredients:[]
  };



  ngOnInit(): void {
  }


}
