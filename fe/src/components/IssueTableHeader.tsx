import { styled } from "styled-components";
import * as CommonS from "../styles/common";
import alertIcon from "../assets/alertCircle.svg";
import archiveIcon from "../assets/archive.svg";
import dropdownIcon from "../assets/dropdownIcon.svg";
import { IssueData } from "../Model/types";
import { PopupType, PopupState } from "../hooks/usePopup";
import MilestonePopup from "./popup/MilestonePopup";
import UserPopup from "./popup/UserPopup";
import LabelPopup from "./popup/LabelPopup";
import useApi from "../hooks/api/useApi";
import { User, Milestone, Label, FilteringState } from "../Model/types";

interface IssueTableHeaderProps {
  filteringState: FilteringState;
  setFilteringState: (item: FilteringState) => void;
  issueList: IssueData;
  popupState: PopupState;
  handleOpenPopup: (popupType: PopupType) => void;
  handleClosePopup: () => void;
  handleFilterInTableHeader: (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => void;
}

export default function IssueTableHeader({
  filteringState,
  setFilteringState,
  issueList,
  handleOpenPopup,
  handleClosePopup,
  popupState,
  handleFilterInTableHeader,
}: IssueTableHeaderProps) {
  const { close_Issues, open_Issues } = issueList;
  const { data: userListData } = useApi<User[]>("/user");
  const { data: labelListData } = useApi<Label[]>("/label");
  const { data: milestoneListData } = useApi<Milestone[]>("/milestone");

  return (
    <IssueTableTop>
      <IssueCheckBox type="checkbox" name="wholeIssue" />
      <TableContent>
        <SelectOpenAndClosedIssueBox>
          <OpenIssueTap
            onClick={() => {
              setFilteringState({ ...filteringState, isOpen: true });
            }}
            isactive={filteringState.isOpen ? "true" : "false"}
          >
            <img src={alertIcon} alt="open icon" />
            <span>열린 이슈({open_Issues.length})</span>
          </OpenIssueTap>
          <ClosedIssueTap
            onClick={() => {
              setFilteringState({ ...filteringState, isOpen: false });
            }}
            isactive={!filteringState.isOpen ? "true" : "false"}
          >
            <img src={archiveIcon} alt="closed icon" />
            <span>닫힌 이슈({close_Issues.length})</span>
          </ClosedIssueTap>
        </SelectOpenAndClosedIssueBox>
        <FilterBtnsOnTable>
          <TableFilterBtn onClick={() => handleOpenPopup("assignee")}>
            담당자 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          {popupState.assignee && userListData && (
            <UserPopup
              userList={userListData}
              selectedUserList={filteringState.assignee}
              onChange={(e) => {
                handleFilterInTableHeader(e, "assignee");
                handleClosePopup();
              }}
              inputType={"radio"}
            />
          )}
          <TableFilterBtn onClick={() => handleOpenPopup("label")}>
            레이블 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          {popupState.label && labelListData && (
            <LabelPopup
              labelList={labelListData}
              selectedLabel={filteringState.label}
              onChange={(e) => {
                handleFilterInTableHeader(e, "label");
                handleClosePopup();
              }}
            />
          )}
          <TableFilterBtn onClick={() => handleOpenPopup("milestone")}>
            마일스톤 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          {popupState.milestone && milestoneListData && (
            <MilestonePopup
              milestoneList={milestoneListData}
              selectedMilestone={filteringState.milestone}
              onChange={(e) => {
                handleFilterInTableHeader(e, "milestone");
                handleClosePopup();
              }}
            />
          )}
          <TableFilterBtn onClick={() => handleOpenPopup("reporter")}>
            작성자 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          {popupState.reporter && userListData && (
            <UserPopup
              userList={userListData}
              selectedUserList={filteringState.reporter}
              onChange={(e) => {
                handleFilterInTableHeader(e, "reporter");
                handleClosePopup();
              }}
              inputType={"radio"}
            />
          )}
        </FilterBtnsOnTable>
      </TableContent>
    </IssueTableTop>
  );
}

const IssueTableTop = styled.div`
  display: flex;
  height: 64px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 25px;
  padding: 0 32px;
`;

const SelectOpenAndClosedIssueBox = styled(CommonS.SpaceBetween)`
  align-items: center;
  width: 227px;
`;

const OpenIssueTap = styled.div<{ isactive: string }>`
  display: flex;
  width: 120px;
  font-weight: ${({ isactive }) => (isactive === "true" ? 700 : 500)};
  font-size: 16px;
  color: ${({ isactive }) =>
    isactive === "true" ? "rgba(20, 20, 43, 1)" : "rgba(78, 75, 102, 1)"};
  cursor: pointer;
  img {
    margin-right: 4px;
  }
`;

const ClosedIssueTap = styled.div<{ isactive: string }>`
  display: flex;
  width: 120px;
  font-weight: ${({ isactive }) => (isactive === "true" ? 700 : 500)};
  font-size: 16px;
  color: ${({ isactive }) =>
    isactive === "true" ? "rgba(20, 20, 43, 1)" : "rgba(78, 75, 102, 1)"};
  cursor: pointer;
  img {
    margin-right: 4px;
  }
`;

const FilterBtnsOnTable = styled(CommonS.SpaceBetween)`
  align-items: center;
  width: 416px;
  height: 100%;
  cursor: pointer;
`;

const TableFilterBtn = styled(CommonS.SpaceBetween)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 100%;
  color: rgba(78, 75, 102, 1);
  font-size: 16px;
  font-weight: 500;
`;

const TableContent = styled(CommonS.SpaceBetween)`
  margin-left: 32px;
  width: 1200px;
  height: 64px;
`;

const IssueCheckBox = styled.input`
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 7px;
`;
