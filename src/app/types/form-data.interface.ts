export enum QueryType {
  GENERAL = 'general',
  SUPPORT = 'support'
}

export interface FormDataInterface {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  queryType: QueryType;
  message: string;
  consent: boolean;
}
