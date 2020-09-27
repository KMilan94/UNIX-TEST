import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CarDetailListComponent } from './car-detail-list/car-detail-list.component';
import { ManufacturerListComponent } from './manufacturer-list/manufacturer-list.component';
import { Apiservice } from 'src/services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSortModule, MatTableModule } from '@angular/material';
import { SearchComponent } from './search/search.component';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CarDetailListComponent,
    ManufacturerListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'car-detail-list', component: CarDetailListComponent },
      { path: 'manufacturer-list', component: ManufacturerListComponent },
      { path: '**', component: HomeComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [ Apiservice ],
  bootstrap: [AppComponent]
})
export class AppModule { }
