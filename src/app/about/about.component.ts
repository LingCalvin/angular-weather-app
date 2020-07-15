import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  appVersion =
    'VERSION' in environment
      ? (environment as { VERSION: string }).VERSION
      : 'DEBUG';

  licenses!: Observable<string>;

  getLicenses(): void {
    this.licenses = this.http.get('./3rdpartylicenses.txt', {
      responseType: 'text',
    });
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLicenses();
  }
}
