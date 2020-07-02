import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-secondary-toolbar',
  templateUrl: './secondary-toolbar.component.html',
  styleUrls: ['./secondary-toolbar.component.css'],
})
export class SecondaryToolbarComponent {
  @Input() title = '';
  @Input() previousPage = '';
}
