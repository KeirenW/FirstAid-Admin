import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ongoing-map',
  templateUrl: './ongoing-map.component.html',
  styleUrls: ['./ongoing-map.component.css']
})
export class OngoingMapComponent implements OnInit {
  public mapDefaultPos: any;

  constructor() {
    this.mapDefaultPos = {
      latitude: 56.458110,
      longitude: -2.982118
    };
  }

  ngOnInit(): void {
  }

}
