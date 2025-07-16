import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Environment } from './../Environment/environment';

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product?: Product;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _baseUrl = Environment.baseUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getCustomerId(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('customerId');
  }

  getCart(): Observable<CartItem[]> {
    if (!this.isBrowser) return of([]); // SSR fallback

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));
    
    return this.http.get<CartItem[]>(`${this._baseUrl}/Cart/${customerId}`);
  }

  addItem(item: CartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot add item on server.'));

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.post(`${this._baseUrl}/Cart/${customerId}/items`, item);
  }

  updateItem(item: CartItem): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot update item on server.'));

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.put(`${this._baseUrl}/Cart/${customerId}/items`, item);
  }

  removeItem(productId: string): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot remove item on server.'));

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.delete(`${this._baseUrl}/Cart/${customerId}/items/${productId}`);
  }

  clearCart(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot clear cart on server.'));

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.delete(`${this._baseUrl}/Cart/${customerId}/clear`);
  }

  checkout(): Observable<any> {
    if (!this.isBrowser) return throwError(() => new Error('Cannot checkout on server.'));

    const customerId = this.getCustomerId();
    if (!customerId) return throwError(() => new Error('Customer ID not found. Please log in.'));

    return this.http.post(`${this._baseUrl}/Cart/${customerId}/checkout`, {});
  }

  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0
    );
  }
}
