import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { NavigationStart } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
      private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
 
   constructor(private router : Router) { 
         // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });     
   }

   success(message : string , keepAfterNavigationChange = false){
     this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
        window.scroll(0,0);
   }
  
      error(message : string , keepAfterNavigationChange = false){
     this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
        window.scroll(0,0);
   }

       getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
