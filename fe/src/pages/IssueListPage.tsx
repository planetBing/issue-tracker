import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import labelIcon from "../assets/label.svg";
import milestoneIcon from "../assets/milestone.svg";
import alertIcon from "../assets/alertCircle.svg";
import archiveIcon from "../assets/archive.svg";
import { issue, Issue } from "./issueMockData";
import LabelComponent from "../components/Label";
import { Link } from "react-router-dom";

export default function IssueListPage() {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <TapAndFilterWrapper>
          <FilterBar>
            <FilterBtn>
              <span>필터</span>
              <img src={dropdownIcon} alt="dropdown" />
            </FilterBtn>
            <FilterSearchBox>
              <img src={searchIcon} alt="serch icon" />
              <input placeholder="is: issue is:open" />
            </FilterSearchBox>
          </FilterBar>
          <ButtonsWrapper>
            <TapBox>
              <TapButton>
                <img src={labelIcon} alt="label icon" />
                레이블(3)
              </TapButton>
              <TapButton>
                <img src={milestoneIcon} alt="milestone icon" />
                마일스톤(2)
              </TapButton>
            </TapBox>
            <IssueCreationButton to="/issue">+ 이슈 작성</IssueCreationButton>
          </ButtonsWrapper>
        </TapAndFilterWrapper>
        <IssueTableTop>
          <IssueCheckBox type="checkbox" name="wholeIssue" />
          <TableContent>
            <SelectOpenAndClosedIssueBox>
              <OpenedIssueTap>
                <img src={alertIcon} alt="opened icon" />
                <span>열린 이슈(3)</span>
              </OpenedIssueTap>
              <ClosedIssueTap>
                <img src={archiveIcon} alt="closed icon" />
                <span>닫힌 이슈(2)</span>
              </ClosedIssueTap>
            </SelectOpenAndClosedIssueBox>
            <FilterBtnsOnTable>
              <TableFilterBtn>
                담당자 <img src={dropdownIcon} alt="dropdown icon" />
              </TableFilterBtn>
              <TableFilterBtn>
                레이블 <img src={dropdownIcon} alt="dropdown icon" />
              </TableFilterBtn>
              <TableFilterBtn>
                마일스톤 <img src={dropdownIcon} alt="dropdown icon" />
              </TableFilterBtn>
              <TableFilterBtn>
                작성자 <img src={dropdownIcon} alt="dropdown icon" />
              </TableFilterBtn>
            </FilterBtnsOnTable>
          </TableContent>
        </IssueTableTop>
        {issue.issue_list.map((issue: Issue) => {
          const { id, title, label, create_at, reporter, milestone } = issue;
          return (
            <IssueTable key={`issue-${id}`}>
              <IssueCheckBox type="checkbox" name={id.toString()} />
              <TableContent>
                <IssueInfo>
                  <IssueInfoTop>
                    <img src={alertIcon} alt="blue alert icon" />
                    <IssueTitle>{title}</IssueTitle>
                    <LabelComponent labelInfo={label} />
                  </IssueInfoTop>
                  <IssueInfoBottom>
                    <span>#{id}</span>
                    <span>
                      이 이슈가 {create_at}, {reporter.name}님에 의해
                      작성되었습니다.
                    </span>
                    <span>
                      <img src={milestoneIcon} alt="milestone icon" />
                      {milestone.name}
                    </span>
                  </IssueInfoBottom>
                </IssueInfo>
                <IssueReporterImg
                  src={reporter.image_path}
                  alt="reporter img"
                />
              </TableContent>
            </IssueTable>
          );
        })}
      </CommonS.Wrapper>
    </>
  );
}

const TapAndFilterWrapper = styled(CommonS.SpaceBetween)`
  height: 40px;
`;

const FilterBar = styled.div`
  width: 560px;
  height: 100%;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  border: 1px solid rgba(217, 219, 233, 1);
`;

const FilterBtn = styled(CommonS.SpaceBetween)`
  background-color: rgba(247, 247, 252, 1);
  height: 100%;
  padding: 0 24px;
  align-items: center;
  width: 128px;
  align-items: center;
  border-right: 1px solid rgba(217, 219, 233, 1);
  cursor: pointer;

  span {
    color: rgba(78, 75, 102, 1);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;

const FilterSearchBox = styled.div`
  width: 431px;
  background-color: rgba(239, 240, 246, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 359px;
    color: rgba(110, 113, 145, 1);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    background-color: transparent;
    border: none;
    margin-left: 8px;
  }
`;

const ButtonsWrapper = styled(CommonS.SpaceBetween)`
  align-items: center;
  width: 465px;
  height: 100%;
`;

const TapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100%;
  border: 1px solid rgba(217, 219, 233, 1);
  border-radius: 12px;
  overflow: hidden;
`;

const TapButton = styled.div`
  width: 159.5px;
  height: 100%;
  background-color: rgba(247, 247, 252, 1);
  color: rgba(78, 75, 102, 1);
  font-size: 16px;
  border-right: 1px solid rgba(217, 219, 233, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border: none;
  }

  img {
    margin-right: 4px;
  }
`;

const IssueCreationButton = styled(Link)`
  width: 128px;
  height: 100%;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  padding: 10px 25px;
`;

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

const OpenedIssueTap = styled.div`
  display: flex;
  width: 103px;
  font-weight: 700;
  font-size: 16px;
  color: rgba(20, 20, 43, 1);

  img {
    margin-right: 4px;
  }
`;

const ClosedIssueTap = styled.div`
  display: flex;
  width: 103px;
  font-weight: 500;
  font-size: 16px;
  color: rgba(78, 75, 102, 1);
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

const IssueTable = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 96px;
  background-color: rgba(254, 254, 254, 1);
  padding: 16px 32px;
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const IssueInfo = styled(CommonS.ColumnFlex)`
  justify-content: space-between;
`;

const IssueInfoTop = styled.div`
  display: flex;

  img {
    filter: invert(36%) sepia(41%) saturate(7096%) hue-rotate(201deg)
      brightness(103%) contrast(104%);
    margin-right: 8px;
  }
`;

const IssueTitle = styled.div`
  font-size: 20px;
  color: rgba(20, 20, 43, 1);
  font-weight: 500;
  margin-right: 8px;
`;

const IssueInfoBottom = styled.div`
  display: flex;

  > span {
    font-size: 16px;
    font-weight: 500;
    color: rgba(110, 113, 145, 1);
    margin-right: 16px;
  }

  & img {
    margin-right: 8px;
  }
`;

const IssueReporterImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 22px;
`;
