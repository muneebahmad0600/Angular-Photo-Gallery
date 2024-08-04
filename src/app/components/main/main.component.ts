import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { map, Observable, shareReplay, switchMap } from "rxjs";
import { PhotoService } from "../../services/photo.service";
import { ScreenSizeService } from "../../services/screen-size.service";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, NgOptimizedImage],
  templateUrl: "./main.component.html",
  styles: [],
})
export class MainComponent implements OnInit {
  photos$!: Observable<any[]>;
  photosColumns$!: Observable<any[][]>;
  screenWidth$!: Observable<number>;

  constructor(private photoService: PhotoService, private router: Router, private screenSizeService: ScreenSizeService) {
    this.screenWidth$ = this.screenSizeService.getScreenWidth();
    this.photos$ = this.photoService.getPhotos().pipe(
      shareReplay(1) // Ensure the observable is shared and replayed to avoid multiple calls
    );
  }

  ngOnInit(): void {
    this.photosColumns$ = this.screenWidth$.pipe(
      switchMap((width) => {
        return this.photos$.pipe(map((photos) => this.createColumns(photos, this.getNumberOfColumns(width))));
      })
    );
  }

  createColumns(photos: any[], numCols: number): any[][] {
    const columns = Array.from<number, any[]>({ length: numCols }, () => []);
    photos.forEach((photo, index) => {
      columns[index % numCols].push(photo);
    });
    return columns;
  }

  getNumberOfColumns(width: number): number {
    if(width >= 1536) { //2xl
      return 10;
    } else if (width >= 1280) { //xl
      return 8;
    } else if (width >= 1024) { //lg
      return 6;
    } else if (width >= 768) { //md
      return 4;
    } else if (width >= 640) { //sm
      return 2;
    } else {
      return 8;
    }
  }

  navigateToDetails(photo: any) {
    this.router.navigate(["/details", photo.id]);
  }
}
