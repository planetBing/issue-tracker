import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { Issue } from "../../type/types";
import LabelComponent from "../label/Label";
import alertIcon from "../../assets/alertCircle.svg";
import milestoneIcon from "../../assets/milestone.svg";
import * as CommonS from "../../styles/common";

interface TableItemsProps {
  items: Issue[];
  handleCheckIssue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIssue: string[];
}

export default function TableItems({
  items,
  handleCheckIssue,
  selectedIssue,
}: TableItemsProps) {
  if (items.length === 0) {
    return (
      <NoneIssueNotification>등록된 이슈가 없습니다.</NoneIssueNotification>
    );
  }
  const reversedItems = [...items].reverse();
  return (
    <>
      {reversedItems.map((item: Issue) => {
        const { id, title, label, create_At, reporter, milestone } = item;
        return (
          <IssueTable key={`issueTableContent-${id}`}>
            <IssueCheckBox
              type="checkbox"
              name={id.toString()}
              value={id}
              checked={selectedIssue.includes(id.toString())}
              onChange={(e) => {
                handleCheckIssue(e);
              }}
            />
            <TableContent>
              <IssueInfo>
                <IssueInfoTop>
                  <img src={alertIcon} alt="blue alert icon" />
                  <IssueTitle to={`issue/${id}`}>{title}</IssueTitle>
                  {label &&
                    label.length > 0 &&
                    label.map((labelObj) => {
                      return (
                        <LabelComponent
                          key={`label-${labelObj.id}`}
                          labelInfo={labelObj}
                        />
                      );
                    })}
                </IssueInfoTop>
                <IssueInfoBottom>
                  <span>#{id}</span>
                  <span>
                    이 이슈가 {create_At}, {reporter.name}님에 의해
                    작성되었습니다.
                  </span>
                  {milestone && (
                    <span>
                      <img src={milestoneIcon} alt="milestone icon" />
                      {milestone?.name}
                    </span>
                  )}
                </IssueInfoBottom>
              </IssueInfo>
              <IssueReporterImg src={reporter.image_path} alt="reporter img" />
            </TableContent>
          </IssueTable>
        );
      })}
    </>
  );
}

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

const IssueTitle = styled(Link)`
  font-size: 20px;
  color: rgba(20, 20, 43, 1);
  font-weight: 500;
  margin-right: 8px;
  text-decoration: none;
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

const IssueCheckBox = styled.input`
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 7px;
`;

const TableContent = styled(CommonS.SpaceBetween)`
  margin-left: 32px;
  width: 1200px;
  height: 64px;
`;

const NoneIssueNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
