import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'about-title',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  readonly title: string;
  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'];
  }

}
