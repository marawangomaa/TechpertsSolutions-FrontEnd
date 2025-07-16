import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'https://your-api-url.com/api/Cart'; // ✅ Replace with your actual API URL
  private customerId = 'customer-123'; // ✅ Replace with dynamic value or fetch from auth/localStorage

  constructor(private http: HttpClient) {}

  // GET /api/Cart/{customerId}
  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/${this.customerId}`);
  }

  // POST /api/Cart/{customerId}/items
  addItem(item: CartItem): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.customerId}/items`, item);
  }

  // PUT /api/Cart/{customerId}/items
  updateItem(item: CartItem): Observable<any> {
    return this.http.put(`${this.baseUrl}/${this.customerId}/items`, item);
  }

  // DELETE /api/Cart/{customerId}/items/{productId}
  removeItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.customerId}/items/${productId}`);
  }

  // DELETE /api/Cart/{customerId}/clear
  clearCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.customerId}/clear`);
  }

  // POST /api/Cart/{customerId}/checkout
  checkout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/${this.customerId}/checkout`, {});
  }

  // Optional: get total cart value (can be called from component)
  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  }
}