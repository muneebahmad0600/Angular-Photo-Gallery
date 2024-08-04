import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { PhotoService } from "../../services/photo.service";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <div class="container mx-auto p-4">
      @if(photo$ | async; as photo) {
      <div class="max-w-md mx-auto">
        <h4 class="text-2xl font-semibold mb-4">{{ photo.title }}</h4>
        <img [ngSrc]="photo.url" [alt]="photo.title" class="rounded-2xl shadow-2xl" height="400" width="400" />
      </div>
      }
    </div>
  `,
  styles: [],
})
export class DetailsComponent {
  photo$: Observable<any>;

  constructor(private route: ActivatedRoute, private photoService: PhotoService) {
    this.photo$ = this.route.params.pipe(switchMap((params) => this.photoService.getPhoto(params["id"])));
  }
}
