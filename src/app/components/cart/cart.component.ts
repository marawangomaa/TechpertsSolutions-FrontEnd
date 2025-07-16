import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../Interfaces/ICartItem';
import { CartService } from '../../Service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
    CartItems: ICartItem[] = [
  {
    productId: '1',
    quantity: 2,
    Product: {
      id: '1',
      name: 'Wireless Mouse',
      description: 'A smooth and responsive wireless mouse.',
      imageUrl: 'https://th.bing.com/th/id/R.7ab5be847fa93fe08906d2e636cbbc36?rik=zjf2lfuiBXXUGw&pid=ImgRaw&r=0',
      price: 250,
      title: 'Logitech M185',
      link: 'https://th.bing.com/th/id/R.7ab5be847fa93fe08906d2e636cbbc36?rik=zjf2lfuiBXXUGw&pid=ImgRaw&r=0',
      category: 'Accessories'
    }
  },
  {
    productId: '2',
    quantity: 1,
    Product: {
      id: '2',
      name: 'Mechanical Keyboard',
      description: 'Backlit mechanical keyboard with blue switches.',
      imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.74butG1TQeRi3WstOY-TWAHaEF?rs=1&pid=ImgDetMain&o=7&rm=3',
      price: 750,
      title: 'KeyChron K6',
      link: 'https://tse2.mm.bing.net/th/id/OIP.74butG1TQeRi3WstOY-TWAHaEF?rs=1&pid=ImgDetMain&o=7&rm=3',
      category: 'Accessories'
    }
  }
];

    constructor(private cartService:CartService){}

    ngOnInit(): void {
      this.loadCart();
    }
    loadCart(): void
    {
        this.cartService.getCart().subscribe(items => {
        this.CartItems = items;
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
  return this.CartItems.reduce((sum, item) => sum + (item.Product?.price ?? 0) * item.quantity, 0);
  }
}
