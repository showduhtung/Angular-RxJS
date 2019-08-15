import { Component, ChangeDetectionStrategy} from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { ProductService } from '../product.service';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  
  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err)
        return EMPTY
      })
    )

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId)
  }
}
