import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import chevronIcon from "../../assets/icons/chevron-down.svg";
import { useEffect, useState } from "react";
import DayRowItem from "./components/dayRowItem";
import useWorkingHoursReducer from "../../hooks/useWorkingHoursReducer";
import isEqual from "lodash/isEqual";
import {
  getLocalStorageByKey,
  setLocalStorage,
} from "../../modules/dataManageToLocal";

export default function WorkingHours() {
  const [isContentOpen, setIsContentOpen] = useState(true);
  const [isDiff, setIsDiff] = useState(false);

  const {
    state,
    onChangeDayWorkingHours,
    onAddDayWorkingHours,
    onDeleteDayWorkingHours,
    OnChangeOriginWorkingHours,
  } = useWorkingHoursReducer();

  const localData = getLocalStorageByKey("workingHours");

  const onUpdate = () => {
    if (isDiff) {
      setLocalStorage("workingHours", state);
      setIsDiff(false);
    }
  };

  const onCancel = () => {
    OnChangeOriginWorkingHours(localData);
    setIsDiff(false);
  };

  useEffect(() => {
    return localData === null
      ? setLocalStorage("workingHours", state)
      : OnChangeOriginWorkingHours(localData);
  }, []);

  useEffect(() => {
    return !isEqual(state, localData) ? setIsDiff(true) : setIsDiff(false);
  }, [state]);

  return (
    <CollapseWrapper isContentOpen={isContentOpen}>
      <div className="title-wrapper">
        <span>Working hour</span>
      </div>
      <div className="content-wrapper">
        <div className="collapse-header-wrapper">
          <strong>Set your weekly hours</strong>
          <button
            className="expand-button"
            onClick={() => setIsContentOpen(!isContentOpen)}
          />
        </div>
        {isContentOpen && (
          <>
            <ul>
              {state.map(({ dayName, dayWorkingHours, timeOptions }, index) => (
                <DayRowItem
                  key={index}
                  dayName={dayName}
                  dayWorkingHours={dayWorkingHours}
                  timeOptions={timeOptions}
                  onChange={onChangeDayWorkingHours}
                  onAdd={onAddDayWorkingHours}
                  onDelete={onDeleteDayWorkingHours}
                />
              ))}
            </ul>
            {isDiff && (
              <div className="button-wrapper">
                <button className="cancel-button" onClick={onCancel}>
                  Cancel
                </button>
                <button className="update-button" onClick={onUpdate}>
                  Update
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </CollapseWrapper>
  );
}

const CollapseWrapper = styled.section<{ isContentOpen: boolean }>`
  display: flex;
  width: 100%;
  margin-top: 32px;
  padding: 0 40px;
  justify-content: flex-start;
  box-sizing: border-box;
  font-size: 15px;
  color: ${COLORS.gray8};

  div.title-wrapper {
    flex: 30%;
    font-weight: 500;
  }

  div.content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;

    div.collapse-header-wrapper {
      flex: 70%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 16px;
      border-bottom: 2px solid ${COLORS.gray2};

      button.expand-button {
        width: 24px;
        height: 24px;
        padding: 0;
        border: none;
        background: transparent url(${chevronIcon}) center / 100% no-repeat;
        transform: ${(props) =>
          props.isContentOpen ? "none" : "rotate(-90deg)"};
        transition: transform 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          background-color: ${COLORS.gray1};
          border-radius: 3px;
        }
      }
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        padding: 40px 0;
        border-bottom: 1px solid ${COLORS.gray2};
        font-weight: 500;
      }
    }

    div.button-wrapper {
      display: flex;
      justify-content: flex-end;
      gap: 24px;
      margin-top: 32px;

      button {
        padding: 10px 24px;
        border: none;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.1px;
        cursor: pointer;
      }

      button.cancel-button {
        background: transparent;
        color: ${COLORS.gray5};

        &:hover {
          color: ${COLORS.gray7};
        }
      }

      button.update-button {
        background-color: ${COLORS.brand6};
        border-radius: 3px;
        color: ${COLORS.white};

        &:hover {
          background-color: ${COLORS.brand4};
        }
      }
    }
  }
`;
