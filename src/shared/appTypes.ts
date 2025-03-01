import { Dispatch, SetStateAction } from 'react';

export enum EPropertyType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
}

export interface IContextValue<T> {
  value: T;
  setter: Dispatch<SetStateAction<T>>;
}
