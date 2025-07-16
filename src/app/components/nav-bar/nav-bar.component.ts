import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../Service/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isLogedIn: boolean = false;
  isDarkMode = false;
  iconClass = 'bi bi-moon-stars';
  cartCount = 0;

  private _router = inject(Router);
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser = isPlatformBrowser(this._platformId);
  userName : string | null = null;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    if (this._isBrowser) {
      // Only access localStorage if running in the browser
      this.isLogedIn = !!localStorage.getItem('userToken');
      this.userName = localStorage.getItem('userName')


      this.cartService.getCart().subscribe(items => {
        this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
      });
    }
  }

  toggleCartFlyout() {
    this._router.navigate(['/cart']);
  }

  toggleDarkMode() {
    if (!this._isBrowser) return; // prevent errors on server

    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      this.iconClass = 'bi bi-brightness-high-fill';
    } else {
      document.body.classList.remove('dark-mode');
      this.iconClass = 'bi bi-moon-stars';
    }
  }

  logout() {
    if (!this._isBrowser) return;

    localStorage.removeItem('userToken');
    localStorage.removeItem('customerId');
    localStorage.removeItem('userName')
    this.isLogedIn = false;
    this._router.navigate(['/login']);
  }
}
