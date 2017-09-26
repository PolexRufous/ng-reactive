import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SimpleComponent } from '../simple/simple/simple.component';
import { ComplexComponent } from '../complex/complex/complex.component';
import { ClickeventComponent } from '../simple/clickevent/clickevent.component';
import { FromarrayComponent } from '../simple/fromarray/fromarray.component';
import { ClicktoarrayComponent } from '../simple/clicktoarray/clicktoarray.component';
import { RandomcolorComponent } from '../simple/randomcolor/randomcolor.component';
import { NameavatarComponent } from '../simple/nameavatar/nameavatar.component';
import { DatafromeventComponent } from '../simple/datafromevent/datafromevent.component';

const routes = [
  {path: '', redirectTo: '/simple', pathMatch: 'full'},
  {path: 'simple', component: SimpleComponent,
  children: [
    {path: 'clickevent', component: ClickeventComponent},
    {path: 'fromarray', component: FromarrayComponent},
    {path: 'clicktoarray', component: ClicktoarrayComponent},
    {path: 'randomcolor', component: RandomcolorComponent},
    {path: 'nameavatar', component: NameavatarComponent},
    {path: 'datafromevent', component: DatafromeventComponent},
  ]},
  {path: 'complex', component: ComplexComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RoutesModule {
}
