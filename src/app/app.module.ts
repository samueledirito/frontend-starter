import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {Params, Route, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {StoreModule} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromOrderCreator from './order-creator/reducers';
import {RouterStateSerializer} from '@ngrx/router-store';


export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
const routes: Routes = [
  <Route> {path: '', component: HomeComponent},
  <Route> {path: 'order', loadChildren: 'app/order-creator/module#OrderCreatorModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}

export interface State {
  orderCreator: fromOrderCreator.State;
  router: fromRouter.RouterReducerState<any>;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      router: fromRouter.routerReducer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    fromRouter.StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    })
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
