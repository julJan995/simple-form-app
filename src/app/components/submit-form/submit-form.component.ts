import {Component, effect, inject} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {FormDataFirebaseService} from '../../services/form-data-firebase/form-data-firebase.service';
import {FormDataService} from '../../services/form-data/form-data.service';
import {catchError, EMPTY, Subject, switchMap} from 'rxjs';
import {FormDataInterface, QueryType} from '../../types/form-data.interface';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-submit-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './submit-form.component.html',
  styleUrl: './submit-form.component.scss'
})
export class SubmitFormComponent {
  formDataService = inject(FormDataService);
  formDataFirebaseService = inject(FormDataFirebaseService);

  contactForm = new FormGroup({
    firstName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    lastName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    queryType: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    consent: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue]
    })
  })

  private readonly _submitTrigger = new Subject<FormDataInterface>();

  readonly submitResult = toSignal(
    this._submitTrigger.asObservable().pipe(
      switchMap(formData =>
        this.formDataFirebaseService.addFormData(formData).pipe(
          catchError(() => EMPTY)
        )
      )
    ),
    { initialValue: null }
  );

  private readonly _submitEffect = effect(() => {
    const id = this.submitResult();
    if (id) {
      this.contactForm.reset();
    }
  });

  onSubmit() {
    if (this.contactForm.valid) {
      const rawValue = this.contactForm.getRawValue();
      const formData: FormDataInterface = {
        ...rawValue,
        queryType: rawValue.queryType as QueryType
      };
      this._submitTrigger.next(formData);
    }
  }
}
