import {reducer} from './reducers';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {HomeComponent} from './home/home.component';
import {Route, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  <Route> {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CommonModule,
    RouterModule
  ]
})
export class OrderCreatorRoutingModule {

}

@NgModule({
  imports: [
    OrderCreatorRoutingModule,
    StoreModule.forFeature('orderCreator', reducer),
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class OrderCreatorModule {

}
