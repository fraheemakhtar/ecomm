import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      exhaustMap(({ filter }) =>
        this.productService.getProducts(filter).pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProduct),
      switchMap(({ id }) =>
        this.productService.getProduct(id).pipe(
          map(product => ProductsActions.loadProductSuccess({ product })),
          catchError(error => of(ProductsActions.loadProductFailure({ error: error.message })))
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      exhaustMap(() =>
        this.productService.getCategories().pipe(
          map(categories => ProductsActions.loadCategoriesSuccess({ categories })),
          catchError(() => of(ProductsActions.loadCategoriesSuccess({ categories: [] })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
