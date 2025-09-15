import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {FormDataFirebaseService} from '../../services/form-data-firebase/form-data-firebase.service';
import {FormDataService} from '../../services/form-data/form-data.service';

@Component({
  selector: 'app-submit-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss'
})
export class SubmitFormComponent implements OnInit {

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    queryType: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    consent: new FormControl(false, Validators.requiredTrue)
  })
  formDataService = inject(FormDataService);
  formDataFirebaseService = inject(FormDataFirebaseService);

  ngOnInit() {
    this.formDataFirebaseService.getFormData().subscribe(formData => {
      this.formDataService.formDataSig.set(formData);
      console.log('formData from Firebase:', formData);
    })
  }

  submitForm() {
    if (this.contactForm.valid) {
      const { firstName, lastName, email, queryType, message, consent } = this.contactForm.value;
      console.log('this.contactForm.value;', this.contactForm.value);
      this.formDataService.addFormData(
        firstName ?? '',
        lastName ?? '',
        email ?? '',
        queryType ?? '',
        message ?? '',
        consent ?? false
      );
    }
  }

}


