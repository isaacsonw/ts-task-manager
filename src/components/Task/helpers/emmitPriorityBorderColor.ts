import { Priority } from '../../CreateTaskForm/enums/Priority';

export const emmitPriorityBorderColor = (
  priority: string,
): string => {
  switch (priority) {
    case Priority.normal:
      return 'grey.600';
    case Priority.low:
      return 'info.light';
    case Priority.high:
      return 'error.light';

    default:
      return 'grey.600';
  }
};
