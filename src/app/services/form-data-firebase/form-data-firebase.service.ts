import {inject, Injectable} from '@angular/core';
import {collection, Firestore, addDoc} from "@angular/fire/firestore";
import {Observable, from} from 'rxjs';
import {FormDataInterface} from '../../types/form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FormDataFirebaseService {
  firestore = inject(Firestore)
  formDataCollection = collection(this.firestore, 'formData');

  constructor() { }

  addFormData(formData: FormDataInterface): Observable<string> {
    const promise = addDoc(this.formDataCollection, formData)
      .then(response => response.id);

    return from(promise);
  }
}
