import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'O Leite';

  navItems: { path: string; text: string }[] = [
    { path: '/animais', text: 'Animais' },
  ];

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}


