import { CartItem } from './../../Service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../Interfaces/ICartItem';
import { CartService } from '../../Service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    CartItems:CartItem[] = []

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
  this.cartService.getCart().subscribe({
    next: (res: any) => {
      const rawItems = res?.data?.cartItems || [];

      this.CartItems = rawItems.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          imageUrl: item.imageUrl,
        }
      }));
    },
    error: (err) => {
      console.log(err);
    },
  });
}


  addToCart(productId: string, quantity: number): void {
    const item: ICartItem = { productId, quantity };
    this.cartService.addItem(item).subscribe(() => this.loadCart());
  }

  updateItem(item: ICartItem): void {
    this.cartService.updateItem(item).subscribe(() => this.loadCart());
  }

  removeItem(productId: string): void {
    this.cartService.removeItem(productId).subscribe(() => this.loadCart());
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(() => this.loadCart());
  }

  checkout(): void {
    this.cartService.checkout().subscribe(() => {
      alert('Checkout complete!');
      this.loadCart();
    });
  }

  getTotal(): number {
  return this.CartItems.reduce(
    (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
    0
  );
}

  hasDiscount(item: ICartItem): boolean {
  return (
    item.Product?.discountPrice !== undefined &&
    item.Product?.price !== undefined &&
    item.Product.discountPrice < item.Product.price
  );
}
}
