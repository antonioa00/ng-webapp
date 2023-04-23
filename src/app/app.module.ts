import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CurrencyPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShowMoreComponent } from './components/show-more/show-more.component';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './login/login.component';
import { ObserversModule } from '@angular/cdk/observers';
import { FirebaseAppModule } from '@angular/fire/app';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TableComponent,
    ShowMoreComponent,
    MainComponent,
    StatsComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: MainComponent },
      { path: 'login', component: LoginComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'table', component: TableComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CurrencyPipe,
    MatProgressSpinnerModule,
    MatCardModule,
    ObserversModule,
    FirebaseAppModule,
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
