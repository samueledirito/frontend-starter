import {Action, combineReducers, createFeatureSelector, createSelector, StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';

export interface State {
  products: string[];
  variations: string[];
}

const initialState = () => (
  <State> {
    products: [],
    variations: []
  }
);

export const ActionTypes = {
  ADD_PRODUCT: 'Add Product',
  ADD_VARIATION: 'Add Variation',
};

export class AddProduct implements Action {
  readonly type: string = ActionTypes.ADD_PRODUCT;

  constructor(public product: string) {
  }
}

export class AddVariation implements Action {
  readonly type: string = ActionTypes.ADD_VARIATION;

  constructor(public variation: string) {
  }
}

function productReducer(state = [], action: Action) {
  switch (action.type) {

    case ActionTypes.ADD_PRODUCT:
      const {product} = action as AddProduct;
      return [...state, product];

    default:
      return state;
  }
}

function variationReducer(state = [], action: Action) {
  switch (action.type) {

    case ActionTypes.ADD_VARIATION:
      const {variation} = action as AddVariation;
      return [...state, `${variation}-`];

    default:
      return state;
  }
}

export const reducer = combineReducers({
  products: productReducer,
  variations: variationReducer
  }
);

export const slice = createFeatureSelector<State>('orderCreator');
export const products = createSelector(slice, (s: State) => s.products);
