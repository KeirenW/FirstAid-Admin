import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.css']
})
export class DispatchComponent implements OnInit {
  public mapDefaultPos: object;

  constructor() {
    this.mapDefaultPos = {
      latitude: 56.458110,
      longitude: -2.982118
    };
  }

  ngOnInit(): void {
  }

}
