import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
    }
  );

  // Inject auth service and FormBuilder into the constructor
  constructor( private authService : AuthService,
  private fb: FormBuilder,
  private router: Router,
  private  _toastService : ToastService
  ){}

  login() {
    // Implement login logic here using this.loginData
    let user = this.authService.login(
      this.form.value.username,
      this.form.value.password
    );
    if (!user) {
      // alert('Invalid logins')
      this._toastService.openSnackBar('Invalid logins', 'done');
    } else {
      this.router.navigateByUrl('/admin');
      this._toastService.openSnackBar(' loggedIn Succesfully', 'done');

    }
  }

}
