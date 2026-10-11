import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'class-detail-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.css',
})
export class ClassDetailComponent {
  readonly id: string | null;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
