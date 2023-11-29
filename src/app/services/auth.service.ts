import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any = [
    {
      id: 1,
      role: 'admin',
      name: 'Admin',
      username: 'durga',
      password: 'abc123',
    },
    {
      id: 2,
      role: 'public',
      name: 'Public',
      username: 'prasad',
      password: 'abc123',
    },
  ];

  session: any;
  isLoggedIn: any;
  loggedInUser: any;
  constructor(private router: Router) {

    // this code is for when the user is loggedIn and back to landing page without logout and enter the url again it will use store the details in local storgae
    let session: any = localStorage.getItem('session');
    if (session) {
      this.session = JSON.parse(session);
    }
    this.session = session;
  }

  //  when the user clicks the login button it will compare the username and password and it valids it store the details in localstorage

  login(username: string, password: string) {
    let user = this.users.find(
      (u: { username: string; password: string; role: string  }) =>
        u.username === username && u.password === password
    );
    if (user) {
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
         // Redirect based on user role
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (user.role === 'public') {
            this.router.navigate(['/public']);
          }
    }
    return user;
  }

  // when  the user is logout from it will be remove the user session details in localStorage.
  logout() {
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigateByUrl('/');
  }
}
