import { useReducer } from "react";
import { styled } from "styled-components";
import UserPopup from "./popup/UserPopup";
import LabelPopup from "./popup/LabelPopup";
import MilestonePopup from "./popup/MilestonePopup";
import { Label, Milestone, User } from "../Model/types";
import LabelComponent from "./Label";
import useApi from "../hooks/api/useApi";
import { milestone } from "./sideBarData";

interface SideBarProps {
  handleInputLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputMilestone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputAssignee: (e: React.ChangeEvent<HTMLInputElement>) => void;
  assigneeList: string[];
  selectedLabel: string[];
  selectedMilestone: string[];
}

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

export default function SideBar({
  handleInputAssignee,
  handleInputLabel,
  handleInputMilestone,
  assigneeList,
  selectedLabel,
  selectedMilestone,
}: SideBarProps) {
  const [popupState, dispatch] = useReducer(popupReducer, initialpopupState);
  const { data: userData } = useApi<User[]>("/user");
  const { data: labelData } = useApi<Label[]>("/label");
  const { data: milestoneData } = useApi<Milestone[]>("/milestone");

  const selectedLabelObj = labelData?.filter((label) =>
    selectedLabel.includes(label.name)
  );
  const selectedMilestoneObj = milestoneData?.filter((milestone) =>
    selectedMilestone.includes(milestone.id.toString())
  );
  const { close_issue, open_issue } = selectedMilestoneObj?.[0] ?? {
    close_issue: 0,
    open_issue: 0,
  };
  const selectedMilestoneProgressNum = close_issue / (close_issue + open_issue);

  return (
    <SideBarWrapper>
      <FirstSideBarItem onClick={() => dispatch({ type: "openAssigneePopup" })}>
        <div>
          <span>담당자</span> <span>+</span>
        </div>
        {!!assigneeList.length && (
          <SelectedAssigneeWrapper>
            {assigneeList.map((assignee) => {
              const selectedUser = userData?.find(
                (userObj) => userObj.name === assignee
              );
              return (
                <SelectedAssignee key={`selectedAssignee-${assignee}`}>
                  <AssigneeImg src={selectedUser?.image_path} />
                  <span>{selectedUser?.name}</span>
                </SelectedAssignee>
              );
            })}
          </SelectedAssigneeWrapper>
        )}
      </FirstSideBarItem>
      {popupState.assignee && userData && (
        <UserPopup
          userList={userData}
          selectedUserList={assigneeList}
          onChange={(e) => {
            handleInputAssignee(e);
            dispatch({ type: "closePopup" });
          }}
          inputType={"checkbox"}
        />
      )}

      <SideBarItem onClick={() => dispatch({ type: "openLabelPopup" })}>
        <div>
          <span>레이블</span> <span>+</span>
        </div>
        {selectedLabel && selectedLabelObj && selectedLabelObj.length > 0 && (
          <SelectedOptionWrapper>
            {selectedLabelObj?.map((label, index) => {
              return (
                <LabelComponent
                  labelInfo={label}
                  key={`selectedLabel-${index}`}
                />
              );
            })}
          </SelectedOptionWrapper>
        )}
      </SideBarItem>
      {popupState.label && labelData && (
        <LabelPopup
          labelList={labelData}
          selectedLabel={selectedLabel}
          onChange={(e) => {
            handleInputLabel(e);
            dispatch({ type: "closePopup" });
          }}
        />
      )}

      <LastSideBarItem onClick={() => dispatch({ type: "openMilestonePopup" })}>
        <div>
          <span>마일스톤</span> <span>+</span>
        </div>
        {selectedMilestone &&
          selectedMilestoneObj &&
          selectedMilestoneObj.length > 0 && (
            <SelectedMilestoneWrapper>
              <ProgressBar>
                <FilledProgressBar $length={selectedMilestoneProgressNum} />
              </ProgressBar>
              <MilestoneTitle>{selectedMilestoneObj[0]?.name}</MilestoneTitle>
            </SelectedMilestoneWrapper>
          )}
      </LastSideBarItem>
      {popupState.milestone && milestoneData && (
        <MilestonePopup
          milestoneList={milestoneData}
          selectedMilestone={selectedMilestone}
          onChange={(e) => {
            handleInputMilestone(e);
            dispatch({ type: "closePopup" });
          }}
        />
      )}

      {(popupState.label || popupState.milestone || popupState.assignee) && (
        <Overlay onClick={() => dispatch({ type: "closePopup" })} />
      )}
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  width: 288px;
`;

const SelectedAssigneeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectedAssignee = styled.div`
  display: flex;
`;

const SelectedOptionWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const SideBarItem = styled.div`
  padding: 32px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  cursor: pointer;

  > div:first-child {
    width: 100%;
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

const AssigneeImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const SelectedMilestoneWrapper = styled.div`
  width: 224px;
`;

const ProgressBar = styled.div`
  width: 100%;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 10px;
  height: 8px;
  margin-bottom: 8px;
`;

const FilledProgressBar = styled.div<{ $length: number }>`
  width: ${(props) => 224 * props.$length}px;
  height: 100%;
  border-radius: 10px;
  background-color: rgba(0, 122, 255, 1);
`;

const MilestoneTitle = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: rgba(20, 20, 43, 1);
  line-height: 16px;
`;
