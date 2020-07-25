import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    isAuthenticated(): boolean {
        if (localStorage.getItem("user") && localStorage.getItem("token")) {
            return true;
        }
        else {
            return false;
        }
    }

    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}