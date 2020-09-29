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
import { AddDialogComponent } from './home/add-dialog/add-dialog.component';
import { SearchComponent } from './search/search.component';
import { Apiservice } from 'src/services/api.service';

import { MatIconModule, MatInputModule, MatSortModule, MatTableModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarDetailComponent } from './car-detail/car-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CarDetailListComponent,
    ManufacturerListComponent,
    SearchComponent,
    AddDialogComponent,
    CarDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'car-detail-list', component: CarDetailListComponent },
      { path: 'manufacturer-list', component: ManufacturerListComponent },
      { path: 'car-detail/:id', component: CarDetailComponent },
      { path: '**', component: HomeComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [ Apiservice ],
  bootstrap: [AppComponent],
  entryComponents: [ AddDialogComponent]
})
export class AppModule { }
