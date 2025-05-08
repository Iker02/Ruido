import { Component, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ruido';
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000); 
  }


}
