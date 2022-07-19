import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class CustomValidator{
    static invalidProjectName(control:FormControl) : { [s: string]:boolean } | null {
        if(control.value === 'Test'){
            return {'invalidProjectName':true};
        }
        return null;
    }

    static asyncInvalidProjectName(control:FormControl): Promise<unknown> | Observable<any> {
      return new Promise((resolve) => {
          setTimeout(function (): any {
            if (control.value === 'TestProject') {
              resolve({'invalidProjectName': true});
            } else {
              return null;
            }
          }, 2000);
        });
    }
}
