import styled from "styled-components";
import WorkingHourItem from "./workingHourItem";
import { isEmpty } from "../../../modules/typeGuard";
import { COLORS } from "../../../styles/colors";
import addIcon from "../../../assets/icons/plus.svg";

interface Props {
  dayName: DayName;
  dayWorkingHours: WorkingHourRange[];
  timeOptions: TimeOptions[];
  onChange(dayName: DayName, value: WorkingHourRange, index: number): void;
  onAdd(dayName: DayName): void;
  onDelete(dayName: DayName, index: number): void;
}

export default function DayRowItem({
  dayName,
  onChange,
  onAdd,
  onDelete,
  timeOptions,
  dayWorkingHours,
}: Props) {
  return (
    <DayRowWrapper>
      <span className="day-name-wrapper">{dayName}</span>
      <div className="day-working-hours-wrapper">
        {dayWorkingHours.map((item, index) => (
          <WorkingHourItem
            key={index}
            index={index}
            dayName={dayName}
            timeOptions={timeOptions}
            timeItem={item}
            isLatestUnit={dayWorkingHours.length === index + 1}
            onDelete={onDelete}
            onAdd={onAdd}
            onChange={onChange}
          />
        ))}
        {isEmpty(dayWorkingHours) && (
          <button className="add-time-button" onClick={() => onAdd(dayName)} />
        )}
      </div>
    </DayRowWrapper>
  );
}

const DayRowWrapper = styled.li`
  display: flex;

  span.day-name-wrapper {
    display: inline-block;
    width: 200px;
    padding-top: 7px;
  }

  div.day-working-hours-wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  button.add-time-button {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: transparent url(${addIcon}) center / 80% no-repeat;
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.gray1};
      border-radius: 3px;
    }
  }
`;
