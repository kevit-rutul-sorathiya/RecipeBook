import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipes.service";
import {FormArray, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {Recipes} from "../recipes.model";

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  id!:number;
  editMode=false;
  recipeForm !: FormGroup;

  constructor(private route:ActivatedRoute ,private recipeService:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params :Params)=>{
        this.id = +params['id'];
        this.editMode= params['id']!=null;
        this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const  recipe= this.recipeService.getRecipe(this.id);
      recipeName= recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup(({
              'name':new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$ /)])
            }))
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$ /)])
      })
    )
  }

  onSubmit(){
    const newRecipe = new Recipes(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onCancel(){
      this.router.navigate(['../'],{relativeTo:this.route})
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
