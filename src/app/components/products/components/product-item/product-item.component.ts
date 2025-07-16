import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../Interfaces/IProduct';
import { CommonModule } from '@angular/common';

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
