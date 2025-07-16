import { Component, Input, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { IProduct } from '../../../../Interfaces/iproduct';
import { CommonModule } from '@angular/common';
=======
import { IProduct } from '../../../../Interfaces/IProduct';
>>>>>>> Stashed changes

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product! : IProduct
}
