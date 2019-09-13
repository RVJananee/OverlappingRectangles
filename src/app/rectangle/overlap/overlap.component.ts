import { Component, OnInit } from '@angular/core';
import { IRectangle } from 'src/app/shared/model/rectangle.model';
import { RectangleService } from 'src/app/core/services/rectangle.service';


@Component({
  selector: 'app-overlap',
  templateUrl: './overlap.component.html',
  styleUrls: ['./overlap.component.scss']
})
export class OverlapComponent implements OnInit {
  isRequired = false;
  input;
  rectangles: IRectangle[];
  constructor(private rectangleService: RectangleService) { }

  ngOnInit() {
  }

  calculate() {
    if (this.input && this.input.trim() !== '') {
      this.rectangleService.calculate(this.input).subscribe((result: IRectangle[]) => {
        if (result) {
          this.rectangles = result;
        }
      });
      this.isRequired = false;
    } else {
      this.isRequired = true;
    }
  }
}
