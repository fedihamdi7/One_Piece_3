import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { ClubComponent } from './club/club.component';

import { AllClubsComponent } from './all-clubs/all-clubs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { AllClubsDetailsComponent } from './all-clubs/all-clubs-details/all-clubs-details.component';
import { ManagerInterceptor } from './services/manager-interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    ClubComponent,
    AllClubsComponent,
    HomeComponent,
    AllClubsDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ManagerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
