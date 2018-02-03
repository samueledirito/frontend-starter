import {Component} from '@angular/core';
import {AddProduct, AddVariation, products, State} from '../reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-oc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  title = 'order-creator Home!';
  products$: Observable<string[]>;

  constructor(private store: Store<State>) {
    this.products$ = store.select(products);
  }

  addProduct() {
    this.store.dispatch(new AddProduct('product1'));
  }

  addVariation() {
    this.store.dispatch(new AddVariation('variation1'));
  }
}
