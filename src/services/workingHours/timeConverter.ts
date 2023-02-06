import generateTimeTable from "../../modules/timeOptions";

export const getStartTimeValue = (
  source: TimeOptions[],
  target: WorkingHourRange
) => {
  return source.find((option) => option.label === target.startTime);
};

export const getEndTimeValue = (
  source: TimeOptions[],
  target: WorkingHourRange
) => {
  return source.find((option) => option.label === target.endTime);
};

export const getTimeLabel = (source: TimeOptions[], target: number) => {
  return source.find((option) => option.value === target);
};

export const findTimeIndex = (target: string) => {
  return generateTimeTable().findIndex((option) => option.label === target);
};
