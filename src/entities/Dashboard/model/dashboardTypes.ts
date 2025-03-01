import { TProperty } from 'entities/Property/model/propertyTypes';

export interface IDashboard {
  id: string;
  title: string;
  properties: TProperty[],

}
