import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  template: `<div class="w-full px-8 py-3 bg-blue-600 flex justify-center items-center">
    <div class="relative">
      @if(showBackButton) {
      <button (click)="navigateBack()" class="absolute -left-40 top-0 flex justify-center items-center bg-white text-grey rounded-lg px-2 py-1 hover:text-blue-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Back</span>
      </button>
      }
      <h1 class="text-2xl font-bold text-white relative">Photo Gallery</h1>
    </div>
  </div>`,
  styles: ``,
})
export class HeaderComponent {
  showBackButton = false;
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === "/") {
          this.showBackButton = false;
        } else {
          this.showBackButton = true;
        }
      }
    });
  }
  navigateBack() {
    this.location.back();
  }
}
