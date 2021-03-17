import { ImageModel } from '../../models/image.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrls: ['./carousel-image.component.css']
})
export class CarouselImageComponent implements OnInit {

  @Input() imageData: ImageModel;

  constructor() { }

  ngOnInit(): void {
  }

}
