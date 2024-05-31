import { styled } from "styled-components";
import * as CommonS from "../../styles/common";
import alertIcon from "../../assets/alertCircle.svg";
import archiveIcon from "../../assets/archive.svg";
import dropdownIcon from "../../assets/dropdownIcon.svg";
import { IssueData } from "../../model/types";
import { PopupType, PopupState } from "../../hooks/usePopup";
import MilestonePopup from "../popup/MilestonePopup";
import UserPopup from "../popup/UserPopup";
import LabelPopup from "../popup/LabelPopup";
import IssueStatusPopup from "../popup/IssueStatusPopup";
import useApi from "../../hooks/api/useApi";
import { User, Milestone, Label, FilteringState } from "../../model/types";

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
  selectedIssue: string[];
  openOrCloseIssues: (status: string) => Promise<void>;
  handleCheckAllIssues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IssueTableHeader({
  filteringState,
  setFilteringState,
  issueList,
  handleOpenPopup,
  handleClosePopup,
  popupState,
  handleFilterInTableHeader,
  selectedIssue,
  openOrCloseIssues,
  handleCheckAllIssues,
}: IssueTableHeaderProps) {
  const { close_Issues, open_Issues } = issueList;
  const { data: userListData } = useApi<User[]>("/user");
  const { data: labelListData } = useApi<Label[]>("/label");
  const { data: milestoneListData } = useApi<Milestone[]>("/milestone");

  const handleOpenOrCloseIssues = async (status: string) => {
    await openOrCloseIssues(status);
    handleClosePopup();
  };

  return (
    <IssueTableTop>
      <IssueCheckBox
        type="checkbox"
        name="wholeIssue"
        checked={
          (filteringState.isOpen ? open_Issues : close_Issues).length > 0 &&
          selectedIssue.length ===
            (filteringState.isOpen ? open_Issues : close_Issues).length
        }
        onChange={handleCheckAllIssues}
      />
      <TableContent>
        {selectedIssue.length > 0 ? (
          <>
            <SelectedIssueNum>
              {selectedIssue.length}개 이슈 선택
            </SelectedIssueNum>
            <TableFilterBtn onClick={() => handleOpenPopup("issueStatus")}>
              상태 변경 <img src={dropdownIcon} alt="dropdown icon" />
              {popupState.issueStatus && (
                <IssueStatusPopup openOrCloseIssues={handleOpenOrCloseIssues} />
              )}
            </TableFilterBtn>
          </>
        ) : (
          <>
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
                {popupState.assignee && userListData && (
                  <UserPopup
                    userList={userListData}
                    selectedUserList={filteringState.assignee}
                    onChange={(e) => {
                      handleFilterInTableHeader(e, "assignee");
                      handleClosePopup();
                    }}
                    inputType={"radio"}
                    isAssigneeNone={true}
                    headerTitle={"담당자"}
                  />
                )}
              </TableFilterBtn>

              <TableFilterBtn onClick={() => handleOpenPopup("label")}>
                레이블 <img src={dropdownIcon} alt="dropdown icon" />
                {popupState.label && labelListData && (
                  <LabelPopup
                    labelList={labelListData}
                    selectedLabel={filteringState.label}
                    onChange={(e) => {
                      handleFilterInTableHeader(e, "label");
                      handleClosePopup();
                    }}
                    isLabelNone={true}
                    inputType={"radio"}
                  />
                )}
              </TableFilterBtn>

              <TableFilterBtn onClick={() => handleOpenPopup("milestone")}>
                마일스톤 <img src={dropdownIcon} alt="dropdown icon" />
                {popupState.milestone && milestoneListData && (
                  <MilestonePopup
                    milestoneList={milestoneListData}
                    selectedMilestone={filteringState.milestone}
                    onChange={(e) => {
                      handleFilterInTableHeader(e, "milestone");
                      handleClosePopup();
                    }}
                    isMilestoneNone={true}
                  />
                )}
              </TableFilterBtn>

              <TableFilterBtn onClick={() => handleOpenPopup("reporter")}>
                작성자 <img src={dropdownIcon} alt="dropdown icon" />
                {popupState.reporter && userListData && (
                  <UserPopup
                    userList={userListData}
                    selectedUserList={filteringState.reporter}
                    onChange={(e) => {
                      handleFilterInTableHeader(e, "reporter");
                      handleClosePopup();
                    }}
                    inputType={"radio"}
                    isAssigneeNone={false}
                    headerTitle={"작성자"}
                  />
                )}
              </TableFilterBtn>
            </FilterBtnsOnTable>{" "}
          </>
        )}
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

const SelectOpenAndClosedIssueBox = styled(CommonS.Center)``;

const OpenIssueTap = styled.div<{ isactive: string }>`
  display: flex;
  margin-right: 24px;
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
  cursor: pointer;
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

const SelectedIssueNum = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
`;
