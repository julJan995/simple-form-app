import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-submit-form',
  imports: [ReactiveFormsModule, MatCardModule],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss'
})
export class SubmitFormComponent {

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    queryType: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    consent: new FormControl(false, Validators.requiredTrue)
  })
}


