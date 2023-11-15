import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // StoreModule.forFeature( 'auth', )
  ]
})
export class AuthModule {

  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
        ngModule: AuthModule,
        providers: [
          AuthService
        ]
    }
}
 }
