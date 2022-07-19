import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({providedIn:'root'})
export class AuthGuard implements  CanActivate{
  private isAuth!: Boolean;

  constructor(private authService:AuthService,private  router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user.pipe(
      take(1),
      map(user=>{
      const isAuth=!!user;
      if(isAuth){
        return true;
      }else{
        return this.router.createUrlTree(['/auth'])
      }
    }),
    //   tap(isAUth=>{
    //   if(!this.isAuth){
    //     this.router.navigate(['/auth'])
    //   }
    // })
    )
  }
}
