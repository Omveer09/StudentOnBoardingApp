import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { StudentModule } from './studentOnBoard/student.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'welcome', component: WelcomeComponent },
      // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]),
    StudentModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
