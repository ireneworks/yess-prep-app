type DayName =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

interface WorkingHourRange {
  startTime: string;
  endTime: string;
}

interface TimeOptions {
  value: number;
  label: string;
  enable: boolean;
}

interface TotalDayWorkingHours {
  dayName: DayName;
  dayWorkingHours: WorkingHourRange[];
  timeOptions: TimeOptions[];
}
