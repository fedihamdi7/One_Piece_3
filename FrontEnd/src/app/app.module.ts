import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { DashRespoComponent } from './dash-respo/dash-respo.component';
import { ClubComponent } from './club/club.component';
import { DashAdminComponent } from './dash-admin/dash-admin.component';
import { AllClubsComponent } from './all-clubs/all-clubs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    HomeComponent,
    ClubComponent,
    DashAdminComponent,
    AllClubsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
