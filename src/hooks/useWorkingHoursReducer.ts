import { useReducer } from "react";
import generateTimeTable from "../modules/timeOptions";
import { findTimeIndex } from "../services/workingHours/timeConverter";
import { isEmpty } from "../modules/typeGuard";

type State = TotalDayWorkingHours[];

interface OnChangeDayWorkingHours {
  type: "ON_CHANGE_DAY_WORKING_HOURS";
  dayName: DayName;
  index: number;
  value: WorkingHourRange;
}

interface OnAddDayWorkingHours {
  type: "ON_ADD_DAY_WORKING_HOURS";
  dayName: DayName;
}

interface OnDeleteDayWorkingHours {
  type: "ON_DELETE_DAY_WORKING_HOURS";
  dayName: DayName;
  index: number;
}

interface OnChangeOriginWorkingHours {
  type: "ON_CHANGE_ORIGIN_WORKING_HOURS";
  value: TotalDayWorkingHours[];
}

type Actions =
  | OnChangeDayWorkingHours
  | OnAddDayWorkingHours
  | OnDeleteDayWorkingHours
  | OnChangeOriginWorkingHours;

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case "ON_CHANGE_DAY_WORKING_HOURS":
      return state.map((dayItem) => {
        return dayItem.dayName === action.dayName
          ? {
              ...dayItem,
              dayWorkingHours: dayItem.dayWorkingHours.map(
                (timeItem, index) => {
                  return index === action.index
                    ? {
                        ...action.value,
                      }
                    : timeItem;
                }
              ),
            }
          : dayItem;
      });

    case "ON_ADD_DAY_WORKING_HOURS":
      return state.map((dayItem) => {
        if (dayItem.dayName === action.dayName) {
          if (!isEmpty(dayItem.dayWorkingHours)) {
            const lastIndex = findTimeIndex(
              dayItem.dayWorkingHours[dayItem.dayWorkingHours.length - 1]
                .endTime
            );
            return {
              ...dayItem,
              dayWorkingHours: dayItem.dayWorkingHours.concat({
                startTime: generateTimeTable()[lastIndex + 1].label,
                endTime: generateTimeTable()[lastIndex + 2].label,
              }),
            };
          }
          return {
            ...dayItem,
            dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
          };
        }
        return dayItem;
      });

    case "ON_DELETE_DAY_WORKING_HOURS":
      return state.map((dayItem) => {
        return dayItem.dayName === action.dayName
          ? {
              ...dayItem,
              dayWorkingHours: dayItem.dayWorkingHours.filter((_, index) => {
                return index !== action.index;
              }),
            }
          : dayItem;
      });

    case "ON_CHANGE_ORIGIN_WORKING_HOURS":
      return action.value;

    default:
      return state;
  }
}

export default function useWorkingHoursReducer() {
  const [state, dispatch] = useReducer(reducer, [
    {
      dayName: "Sunday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Monday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Tuesday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Wednesday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Thursday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Friday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
    {
      dayName: "Saturday",
      dayWorkingHours: [{ startTime: "09:00", endTime: "17:00" }],
      timeOptions: generateTimeTable(),
    },
  ]);

  const onChangeDayWorkingHours = (
    dayName: DayName,
    value: WorkingHourRange,
    index: number
  ) =>
    dispatch({
      type: "ON_CHANGE_DAY_WORKING_HOURS",
      dayName,
      value,
      index,
    });

  const onAddDayWorkingHours = (dayName: DayName) =>
    dispatch({
      type: "ON_ADD_DAY_WORKING_HOURS",
      dayName,
    });

  const onDeleteDayWorkingHours = (dayName: DayName, index: number) =>
    dispatch({ type: "ON_DELETE_DAY_WORKING_HOURS", dayName, index });

  const OnChangeOriginWorkingHours = (value: TotalDayWorkingHours[]) =>
    dispatch({ type: "ON_CHANGE_ORIGIN_WORKING_HOURS", value });

  return {
    state,
    onChangeDayWorkingHours,
    onAddDayWorkingHours,
    onDeleteDayWorkingHours,
    OnChangeOriginWorkingHours,
  } as const;
}
