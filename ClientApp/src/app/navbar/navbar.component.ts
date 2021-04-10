import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  isMenuCollapsed = true;

  @Input() title: string;
  @Input() navItems: { path: string; text: string }[];

}
