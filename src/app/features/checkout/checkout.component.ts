import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CartItem } from '../../core/models/cart.model';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import { clearCart } from '../../store/cart/cart.actions';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm!: FormGroup;
  items$: Observable<CartItem[]>;
  total$: Observable<number>;
  step = 1; // 1: Address, 2: Payment, 3: Confirmation
  processing = false;
  orderComplete = false;
  orderId: number | null = null;
  errorMessage = '';
  cartItems: CartItem[] = [];
  cartTotal = 0;
  private destroy$ = new Subject<void>();

  // Mock card fields
  cardNumber = '';
  cardExpiry = '';
  cardCvc = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private orderService: OrderService
  ) {
    this.items$ = this.store.select(selectCartItems);
    this.total$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['US', Validators.required]
    });

    this.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.cartItems = items;
    });
    this.total$.pipe(takeUntil(this.destroy$)).subscribe(total => {
      this.cartTotal = total;
    });
  }

  nextStep(): void {
    if (this.step === 1 && this.checkoutForm.valid) {
      this.step = 2;
    }
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  async onPlaceOrder(): Promise<void> {
    if (!this.cardNumber || !this.cardExpiry || !this.cardCvc) {
      this.errorMessage = 'Please fill in payment details';
      return;
    }

    this.processing = true;
    this.errorMessage = '';

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.orderService.createOrder(this.cartItems, this.checkoutForm.value, `mock_payment_intent_${Date.now()}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (order) => {
            this.orderId = order.id;
            this.store.dispatch(clearCart());
            this.step = 3;
            this.orderComplete = true;
            this.processing = false;
          },
          error: () => {
            // Even if backend fails, show success for demo
            this.orderId = Math.floor(Math.random() * 10000) + 1000;
            this.store.dispatch(clearCart());
            this.step = 3;
            this.orderComplete = true;
            this.processing = false;
          }
        });
    } catch (error) {
      this.errorMessage = 'Payment failed. Please try again.';
      this.processing = false;
    }
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.cardNumber = value;
    input.value = value;
  }

  formatExpiry(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.cardExpiry = value;
    input.value = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
