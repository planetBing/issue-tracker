import { styled } from "styled-components";
import * as CommonS from "../styles/common";
import alertIcon from "../assets/alertCircle.svg";
import archiveIcon from "../assets/archive.svg";
import dropdownIcon from "../assets/dropdownIcon.svg";
import { IssueData } from "../Model/types";
import { PopupType, PopupState } from "../hooks/usePopup";
import MilestonePopup from "./popup/MilestonePopup";
import { milestone } from "../components/sideBarData";
import UserPopup from "./popup/UserPopup";
import useApi from "../hooks/api/useApi";
import { User, Milestone, Label } from "../Model/types";

interface IssueTableHeaderProps {
  showOpenIssues: boolean;
  setShowOpenIssues: React.Dispatch<React.SetStateAction<boolean>>;
  issueList: IssueData;
  popupState: PopupState;
  handleOpenPopup: (popupType: PopupType) => void;
}

export default function IssueTableHeader({
  showOpenIssues,
  setShowOpenIssues,
  issueList,
  handleOpenPopup,
  popupState,
}: IssueTableHeaderProps) {
  const { close_Issues, open_Issues } = issueList;
  const { data: userListData } = useApi<User[]>("/user");

  return (
    <IssueTableTop>
      <IssueCheckBox type="checkbox" name="wholeIssue" />
      <TableContent>
        <SelectOpenAndClosedIssueBox>
          <OpenIssueTap
            onClick={() => {
              setShowOpenIssues(true);
            }}
            isactive={showOpenIssues ? "true" : "false"}
          >
            <img src={alertIcon} alt="open icon" />
            <span>열린 이슈({open_Issues.length})</span>
          </OpenIssueTap>
          <ClosedIssueTap
            onClick={() => {
              setShowOpenIssues(false);
            }}
            isactive={!showOpenIssues ? "true" : "false"}
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
              assigneeList={[]}
              onChange={console.log}
            />
          )}
          <TableFilterBtn>
            레이블 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          <TableFilterBtn onClick={() => handleOpenPopup("milestone")}>
            마일스톤 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
          <TableFilterBtn>
            작성자 <img src={dropdownIcon} alt="dropdown icon" />
          </TableFilterBtn>
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
  width: 103px;
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
  width: 103px;
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
