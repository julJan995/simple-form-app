import {Injectable, signal} from '@angular/core';
import {FormDataInterface} from '../../types/form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  formDataSig = signal<FormDataInterface[]>([]);
  constructor() { }

  addFormData(
    firstName: string,
    lastName: string,
    email: string,
    queryType: string,
    message: string,
    consent: boolean,
    ): void {
    const newFormData: FormDataInterface = {
      firstName,
      lastName,
      email,
      queryType,
      message,
      consent
    };
    this.formDataSig.update((data) => [...data, newFormData]);
  }
}
