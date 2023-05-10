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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
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
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { StatsComponent } from './components/stats/stats.component';
import { LoginComponent } from './login/login.component';
import { ObserversModule } from '@angular/cdk/observers';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { IsAuthGuard } from './guards/is-auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    TableComponent,
    MainComponent,
    StatsComponent,
    LoginComponent,
    DialogInfoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: MainComponent, canActivate: [IsAuthGuard] },
      { path: 'login', component: LoginComponent, canActivate: [IsAuthGuard] },
      { path: 'stats', component: StatsComponent, canActivate: [IsAuthGuard] },
      { path: 'table', component: TableComponent, canActivate: [IsAuthGuard] },
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1000,
    }),
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
