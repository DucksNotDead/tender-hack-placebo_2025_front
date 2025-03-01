import { EPropertyType } from 'shared/appTypes';

export type TProperty = {
  id: number;
  name: string;
  label: string;
} & (
  | { type: EPropertyType.STRING; value: string }
  | { type: EPropertyType.NUMBER; value: number }
);
