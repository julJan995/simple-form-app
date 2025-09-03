import { Component } from '@angular/core';
import { SubmitFormComponent } from './components/submit-form/submit-form.component';

@Component({
  selector: 'app-root',
  imports: [SubmitFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simple-form';
}
