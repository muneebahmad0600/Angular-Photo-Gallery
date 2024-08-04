import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScreenSizeService {
  private screenWidth$ = new BehaviorSubject<number>(0);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth$.next(window.innerWidth);
      window.addEventListener("resize", this.onResize.bind(this));
    }
  }

  private onResize() {
    this.screenWidth$.next(window.innerWidth);
  }

  getScreenWidth() {
    return this.screenWidth$.asObservable();
  }
}
