import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  

  constructor(private userService: UserService, private router: Router) { }

  async ngOnInit() {
    
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var url = state.url.trim();
    var userLoggedIn = await this.userService.getUserLoggedIn()
    if (userLoggedIn == true && url == '/login') {
      console.log(url)
      this.router.navigate(['home']);
      return false;
    }

    if (userLoggedIn == false && url != '/login') {
        this.router.navigate(['login']);
        return false;
    }
    return true;
  }
}
