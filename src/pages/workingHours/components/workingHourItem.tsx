import Select from "react-select";
import styled from "styled-components";
import removeIcon from "../../../assets/icons/trash.svg";
import addIcon from "../../../assets/icons/plus.svg";
import { COLORS } from "../../../styles/colors";
import { useEffect, useState } from "react";
import {
  getEndTimeValue,
  getStartTimeValue,
  getTimeLabel,
} from "../../../services/workingHours/timeConverter";

interface Props {
  index: number;
  isLatestUnit: boolean;
  dayName: DayName;
  timeItem: WorkingHourRange;
  timeOptions: TimeOptions[];
  onAdd(dayName: DayName): void;
  onChange(dayName: DayName, value: WorkingHourRange, index: number): void;
  onDelete(dayName: DayName, index: number): void;
}

export default function WorkingHourItem({
  index,
  dayName,
  timeItem,
  onAdd,
  onChange,
  onDelete,
  timeOptions,
  isLatestUnit,
}: Props) {
  const [workingHourRange, setWorkingHourRange] = useState<WorkingHourRange>({
    startTime: timeItem.startTime,
    endTime: timeItem.endTime,
  });

  useEffect(() => {
    onChange(dayName, workingHourRange, index);
  }, [workingHourRange]);

  return (
    <Container>
      <div className="select-menu-wrapper">
        <Select
          value={getStartTimeValue(timeOptions, timeItem)}
          options={timeOptions}
          onChange={(e) =>
            setWorkingHourRange({
              ...workingHourRange,
              startTime: getTimeLabel(timeOptions, e!.value)!.label,
            })
          }
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "130px",
              cursor: "pointer",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
          }}
        />
        <span>-</span>
        <Select
          value={getEndTimeValue(timeOptions, timeItem)}
          options={timeOptions}
          onChange={(e) =>
            setWorkingHourRange({
              ...workingHourRange,
              endTime: getTimeLabel(timeOptions, e!.value)!.label,
            })
          }
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              width: "130px",
              cursor: "pointer",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              display: "none",
            }),
          }}
        />
      </div>
      <button
        className="remove-time-button"
        onClick={() => onDelete(dayName, index)}
      />
      {isLatestUnit && (
        <button className="add-time-button" onClick={() => onAdd(dayName)} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  div.select-menu-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      color: ${COLORS.gray6};
    }
  }

  button {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    cursor: pointer;
  }

  button.remove-time-button {
    margin: 0 16px;
    background: transparent url(${removeIcon}) center / 80% no-repeat;

    &:hover {
      background-color: ${COLORS.gray1};
      border-radius: 3px;
    }
  }

  button.add-time-button {
    background: transparent url(${addIcon}) center / 80% no-repeat;

    &:hover {
      background-color: ${COLORS.gray1};
      border-radius: 3px;
    }
  }
`;
