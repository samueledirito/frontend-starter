import {reducerProvider, reducerToken} from './reducers';
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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class OrderCreatorRoutingModule {

}

@NgModule({
  imports: [
    CommonModule,

    OrderCreatorRoutingModule,
    StoreModule.forFeature('orderCreator', reducerToken),
  ],
  providers: [reducerProvider],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent,
    CommonModule,
  ]
})
export class OrderCreatorModule {

}
