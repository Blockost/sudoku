import { Injectable } from '@angular/core';

// XXX: 2018-10-14 Blockost
// Global variable FB is declared and initialized in index.html
declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  constructor() {}

  openShareDialog() {
    const shareParams = {
      method: 'share',
      href: 'http://blockost-sudoku.herokuapp.com',
      hashtag: '#sudoku'
    };

    FB.ui(shareParams, (res) => {
      console.log(res);
    });
  }
}
