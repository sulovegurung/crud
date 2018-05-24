import { Component, Input } from '@angular/core';

/**
 * Generated class for the NavbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html'
})
export class NavbarComponent {

  @Input() title: string;

  constructor() {
    console.log('Hello NavbarComponent loaded');
  }

}
