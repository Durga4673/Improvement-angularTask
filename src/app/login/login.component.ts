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
      this._toastService.openSnackBar('Invalid logins', 'done');
    } else {
      if (user.role === 'admin') {

        this.router.navigateByUrl('/admin');

      } else if (user.role === 'public') {

        this.router.navigateByUrl('/public');
      }
      this._toastService.openSnackBar('Logged in Successfully', 'done');
    }
}

}
