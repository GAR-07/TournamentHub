import { Component } from "@angular/core";
import { ChangePasswordForm } from "./components/change-password-form/change-password-form";

@Component({
  selector: 'app-cabinet-page',
  imports: [ChangePasswordForm],
  templateUrl: './cabinet-page.html',
  styleUrl: './cabinet-page.scss',
})
export class CabinetPage {
  
}
