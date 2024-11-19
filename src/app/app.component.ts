import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private meta: Meta, private title: Title) {}
  ngOnInit(): void {
    console.log('init')
    this.title.setTitle('Dashboard Application');
    this.meta.addTags([
      {name: 'description', content: 'A sample Angular dashboard with SSR'},
      {name: 'keywords', content: 'Angular, SSR, Dashboard'},
    ]);
  }
}
