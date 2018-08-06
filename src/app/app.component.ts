import { Component, OnInit } from '@angular/core';

import { Board } from './models/board';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  board: Board;

  ngOnInit(): void {
    this.board = new Board(9);
  }
}
