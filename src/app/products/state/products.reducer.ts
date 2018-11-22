import { Product } from "../product";
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./products.actions";

export interface State extends  fromRoot.State{
  products: ProductState;
}

export interface ProductState{
  showProductCode: boolean;
  products: Product[];
  currentProduct: Product;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []

}

export function reducer(state:ProductState = initialState,action : ProductActions): ProductState{
  console.log('reducer ',state,action)
  switch(action.type){
    case ProductActionTypes.ToggleProductCode:
    return {
      ...state,
      showProductCode: action.payload
    };

    case ProductActionTypes.SetCurrentProduct:
    return {
      ...state,
      currentProduct :{
        ...action.payload
      }
    }

    case ProductActionTypes.ClearCurrentProduct:
    return {
      ...state,
      currentProduct: null
    };

    case ProductActionTypes.InitializeCurrentProduct:
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode : 'New',
        description : '',
        starRating: 0
      }
    };

    case ProductActionTypes.Load:
    return state;

    default:
    return state;
  }
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState,
  state => state.showProductCode);




export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

// export const getCurrentProductId = createSelector(getProductFeatureState,
//   state => state.currentProductId);

  // export const getCurrentProduct = createSelector(
  //   getProductFeatureState,
  //   getCurrentProductId,
  //   (state,currentProductId)=> state.products.find(p=> p.id === currentProductId)
  // );

  export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
