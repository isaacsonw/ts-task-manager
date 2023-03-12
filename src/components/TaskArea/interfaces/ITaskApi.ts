import { Priority } from '../../CreateTaskForm/enums/Priority';
import { Status } from '../../CreateTaskForm/enums/Status';

export interface ITaskApi {
  title: string;
  description: string;
  date: string;
  priority: `${Priority}`;
  status: `${Status}`;
  id: string;
}
