import { useReducer } from "react";
import { styled } from "styled-components";
import { label, milestone } from "./sideBarData";

interface PopupState {
  assignee: boolean;
  label: boolean;
  milestone: boolean;
}

type ActionType =
  | { type: "openAssigneePopup" }
  | { type: "openLabelPopup" }
  | { type: "openMilestonePopup" }
  | { type: "closePopup" };

const initialpopupState = {
  assignee: false,
  label: false,
  milestone: false,
};

const popupReducer = (state: PopupState, action: ActionType) => {
  switch (action.type) {
    case "openAssigneePopup":
      return { ...state, assignee: true };
    case "openLabelPopup":
      return { ...state, label: true };
    case "openMilestonePopup":
      return { ...state, milestone: true };
    case "closePopup":
      return initialpopupState;
    default:
      return state;
  }
};

export default function SideBar() {
  const [popupState, dispatch] = useReducer(popupReducer, initialpopupState);

  return (
    <div>
      <FirstSideBarItem onClick={() => dispatch({ type: "openAssigneePopup" })}>
        <div>
          <span>담당자</span> <span>+</span>
        </div>
      </FirstSideBarItem>
      <SideBarItem onClick={() => dispatch({ type: "openLabelPopup" })}>
        <div>
          <span>레이블</span> <span>+</span>
        </div>
      </SideBarItem>
      <LastSideBarItem onClick={() => dispatch({ type: "openMilestonePopup" })}>
        <div>
          <span>마일스톤</span> <span>+</span>
        </div>
      </LastSideBarItem>

      {(popupState.label || popupState.milestone) && (
        <Overlay onClick={() => dispatch({ type: "closePopup" })} />
      )}

      {popupState.label && (
        <DropdownPanel>
          <DropdownHeader>레이블 설정</DropdownHeader>
          {label.map((item) => (
            <DropdownOption key={`label-${item.name}`}>
              <LabelInfo>
                <LabelColorCircle
                  color={item.backgroundColor}
                ></LabelColorCircle>
                <span>{item.name}</span>
              </LabelInfo>
              <input
                type="radio"
                id={item.name}
                name="label"
                value={item.name}
              />
            </DropdownOption>
          ))}
        </DropdownPanel>
      )}

      {popupState.milestone && (
        <DropdownPanel>
          <DropdownHeader>마일스톤 설정</DropdownHeader>
          {milestone.map((item) => (
            <DropdownOption key={`milestone-${item.id}`}>
              <LabelInfo>
                <span>{item.title}</span>
              </LabelInfo>
              <input
                type="radio"
                id={item.title}
                name="label"
                value={item.title}
              />
            </DropdownOption>
          ))}
        </DropdownPanel>
      )}
    </div>
  );
}

const SideBarItem = styled.div`
  min-height: 75px;
  width: 288px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  cursor: pointer;

  & div {
    width: 224px;
    display: flex;
    justify-content: space-between;
  }

  & span {
    color: rgba(78, 75, 102, 1);
    font-size: 16px;
    font-weight: 500;
  }
`;

const FirstSideBarItem = styled(SideBarItem)`
  border-top: 1px solid rgba(217, 219, 233, 1);
  border-top-left-radius: 10px;
  border-top-right-radius: 16px;
`;

const LastSideBarItem = styled(SideBarItem)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 16px;
`;

const DropdownPanel = styled.div`
  position: relative;
  width: 240px;
  min-height: 67.5px;
  max-height: 211.5px;
  border-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  overflow: hidden;
  z-index: 1100;
`;

const DropdownHeader = styled.div`
  padding: 8px 16px;
  background-color: rgba(247, 247, 252, 1);
  color: rgba(110, 113, 145, 1);
  font-weight: 500;
  font-size: 12px;
`;

const LabelColorCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom: none;
  }
`;

const LabelInfo = styled.div`
  display: flex;

  & div {
    margin-right: 8px;
  }

  & span {
    font-weight: 500;
    font-size: 16px;
    color: rgba(78, 75, 102, 1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
