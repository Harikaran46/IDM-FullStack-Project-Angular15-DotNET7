import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less']
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string = 'An error occurred';
  statusCode?: number ;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const state = this.route.snapshot.data.state as { errorMessage: string, statusCode: number };

    if (state) {
      this.errorMessage = state.errorMessage;
      this.statusCode = state.statusCode;
    }
  }
}
