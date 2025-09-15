import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {catchError, map, Observable, of} from 'rxjs';
import {FormDataInterface} from '../../types/form-data.interface';

@Injectable({
  providedIn: 'root'
})
export class FormDataFirebaseService {
  firestore = inject(Firestore)
  formDataCollection = collection(this.firestore, 'formData');

  constructor() { }

  getFormData(): Observable<FormDataInterface[]> {
    return collectionData(this.formDataCollection, { idField: 'id' }).pipe(
      map((docs) => docs as FormDataInterface[]),
      catchError(error => {
        console.error('Error fetching form data:', error);
        return of([]);
      })
    );
  }
}
