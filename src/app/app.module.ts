import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RoutesModule} from './routes/routes.module';
import {SimpleComponent} from './simple/simple/simple.component';
import {ComplexComponent} from './complex/complex/complex.component';
import {RouterModule} from '@angular/router';
import {ClickeventComponent} from './simple/clickevent/clickevent.component';
import {FromarrayComponent} from './simple/fromarray/fromarray.component';
import {ClicktoarrayComponent} from './simple/clicktoarray/clicktoarray.component';
import {RandomcolorComponent} from './simple/randomcolor/randomcolor.component';
import {NameavatarComponent} from './simple/nameavatar/nameavatar.component';
import {DatafromeventComponent} from './simple/datafromevent/datafromevent.component';
import {ConcateventsComponent} from './complex/concatevents/concatevents.component';
import {ServereventComponent} from './complex/serverevent/serverevent.component';
import {MdProgressBarModule, MdProgressSpinnerModule, MdTableModule, MdToolbarModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import {TerminatedserverComponent} from './complex/terminatedserver/terminatedserver.component';
import {StreamsComponent} from './streams/streams/streams.component';
import {DealsComponent} from './streams/deals/deals.component';
import {ChartsModule} from 'ng2-charts';
import {DealService} from './streams/deals/services/deal.service';
import {LeatherComponent} from './streams/deals/leather/leather.component';
import {CoalComponent} from './streams/deals/coal/coal.component';
import {SugarComponent} from './streams/deals/sugar/sugar.component';
import {CarsComponent} from './streams/cars/cars.component';
import {CarsService} from './streams/cars/services/cars.service';

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
    DatafromeventComponent,
    ConcateventsComponent,
    ServereventComponent,
    TerminatedserverComponent,
    StreamsComponent,
    DealsComponent,
    LeatherComponent,
    CoalComponent,
    SugarComponent,
    CarsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutesModule,
    MdProgressSpinnerModule,
    MdProgressBarModule,
    MdToolbarModule,
    HttpModule,
    ChartsModule,
    MdProgressBarModule,
    MdTableModule
  ],
  providers: [DealService, CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
