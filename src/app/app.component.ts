import { HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent],
  template: `<div>
    <app-header></app-header>
    <router-outlet />
  </div>`,
  styles: [],
})
export class AppComponent {}
