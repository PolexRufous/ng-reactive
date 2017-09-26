import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { SimpleComponent } from './simple/simple/simple.component';
import { ComplexComponent } from './complex/complex/complex.component';
import { RouterModule } from '@angular/router';
import { ClickeventComponent } from './simple/clickevent/clickevent.component';
import { FromarrayComponent } from './simple/fromarray/fromarray.component';
import { ClicktoarrayComponent } from './simple/clicktoarray/clicktoarray.component';
import { RandomcolorComponent } from './simple/randomcolor/randomcolor.component';
import { NameavatarComponent } from './simple/nameavatar/nameavatar.component';
import { DatafromeventComponent } from './simple/datafromevent/datafromevent.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleComponent,
    ComplexComponent,
    ClickeventComponent,
    FromarrayComponent,
    ClicktoarrayComponent,
    RandomcolorComponent,
    NameavatarComponent,
    DatafromeventComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
