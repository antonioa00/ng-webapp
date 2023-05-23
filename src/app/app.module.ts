// MODULES
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ObserversModule } from '@angular/cdk/observers';
import { MaterialModule } from './shared/modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MainComponent } from '../main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DialogUploadComponent } from './components/dialog-upload/dialog-upload.component';
import { InputModifyComponent } from './components/dialog-upload/input-modify/input-modify.component';
import { DialogSettingsComponent } from './components/dialog-settings/dialog-settings.component';
import { StatsComponent } from './components/stats/stats.component';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

// GUARD
import { IsAuthGuard } from './guards/is-auth.guard';

// LIBRARIES
import { ToastrModule } from 'ngx-toastr';

// OTHERS
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogFilterScadenzeComponent } from './components/table/dialog-filter-scadenze/dialog-filter-scadenze.component';

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
    DialogSettingsComponent,
    DialogUploadComponent,
    InputModifyComponent,
    ToolbarComponent,
    DialogFilterScadenzeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {
        path: 'home',
        component: MainComponent,
        canActivate: [IsAuthGuard],
      },
      { path: 'login', component: LoginComponent, canActivate: [IsAuthGuard] },
      { path: 'stats', component: StatsComponent, canActivate: [IsAuthGuard] },
      { path: 'table', component: TableComponent, canActivate: [IsAuthGuard] },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ObserversModule,
    CurrencyPipe,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 1000,
    }),
    MaterialModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
