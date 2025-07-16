import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { CartComponent } from "../cart/cart.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CartComponent,NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLogedIn: boolean = false;

  isDarkMode = false;
  iconClass = 'bi bi-moon-stars';  // initial icon

  showCartFlyout = false;
  cartCount = 0;
  _router = inject(Router)

  constructor(private cartService: CartService) { }



  ngOnInit() {
  this.cartService.getCart().subscribe(items => {
    this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  });
}

toggleCartFlyout() {
  this._router.navigate(['/cart']);
}


  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      this.iconClass = 'bi bi-brightness-high-fill';
    } else {
      document.body.classList.remove('dark-mode');
      this.iconClass = 'bi bi-moon-stars';
    }
  }
}
