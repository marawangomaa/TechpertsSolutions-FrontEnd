import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Teckperts-Solutions';

  isCartFlyoutOpen = false;
showFlyout = false;

constructor(private router: Router, private route: ActivatedRoute) {
  this.router.events.subscribe(() => {
    const outlet = this.route.snapshot.children.find(c => c.outlet === 'flyout');
    this.showFlyout = !!outlet;
    this.isCartFlyoutOpen = !!outlet;
  });
}
}
