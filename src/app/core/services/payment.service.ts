import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise = loadStripe(environment.stripePublicKey);

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number, currency: string = 'usd'): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(
      `${environment.apiUrl}/payments/create-intent`,
      { amount, currency }
    );
  }

  redirectToCheckout(sessionId: string): Observable<void> {
    return from(this.stripePromise).pipe(
      switchMap((stripe: Stripe | null) => {
        if (!stripe) throw new Error('Stripe not loaded');
        return from(stripe.redirectToCheckout({ sessionId }).then(() => {}));
      })
    );
  }

  async confirmPayment(clientSecret: string, cardElement: any): Promise<any> {
    const stripe = await this.stripePromise;
    if (!stripe) throw new Error('Stripe not loaded');
    return stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement }
    });
  }
}
