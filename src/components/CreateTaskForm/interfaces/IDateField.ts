import { IDisabled } from './IDisabled';

type DateType = Date | null | string;

export interface IDateField extends IDisabled {
  value?: DateType;
  onChange?: (e: DateType) => void;
}
