import { styled } from "styled-components";
import * as S from "../styles/tableItems";
import * as CommonS from "../styles/common";
import { Milestone } from "../Model/types";
import { calculateMilestoneProgress } from "../utils/utils";
import milestoneIcon from "../assets/milestone.svg";
import calendarIcon from "../assets/IconCalendar.svg";
import trashIcon from "../assets/trash.svg";
import editIcon from "../assets/greyEdit.svg";
import archiveIcon from "../assets/archive.svg";
import MilestoneProgressBar from "./MilestoneProgressBar";

interface MilestoneTableItemsProps {
  milestoneObj: Milestone;
  handleDeleteMilestone: (id: number) => Promise<void>;
  handleEditMode: (
    milestoneId: number,
    name: string,
    description: string | null,
    end_date: string
  ) => void;
}

export default function MilestoneTableItems({
  milestoneObj,
  handleDeleteMilestone,
  handleEditMode,
}: MilestoneTableItemsProps) {
  const { id, name, end_date, description, close_issue, open_issue } =
    milestoneObj;
  const progressNum = calculateMilestoneProgress(open_issue, close_issue);
  return (
    <S.IssueTable>
      <TableLeftSide>
        <MilestoneInfo>
          <div>
            <BlueMilestoneIcon src={milestoneIcon} alt="milestone icon" />
            <MilestoneTitle>{name}</MilestoneTitle>
          </div>
          <div>
            {end_date && <img src={calendarIcon} alt="calendar icon" />}
            <MilestoneEndDate>{end_date}</MilestoneEndDate>
          </div>
        </MilestoneInfo>
        <MilestoneDescription>{description}</MilestoneDescription>
      </TableLeftSide>
      <TableRightSide>
        <ButtonArea>
          <S.LabelEditButton>
            <img src={archiveIcon} alt="archive icon" />
            닫기
          </S.LabelEditButton>
          <S.LabelEditButton
            onClick={() => handleEditMode(id, name, description, end_date)}
          >
            <img src={editIcon} alt="edit icon" />
            편집
          </S.LabelEditButton>
          <S.LabelDeleteButton onClick={() => handleDeleteMilestone(id)}>
            <img src={trashIcon} alt="trash icon" />
            삭제
          </S.LabelDeleteButton>
        </ButtonArea>
        <ProgressArea>
          <MilestoneProgressBar
            closedIsseusNum={close_issue}
            openIssuesNum={open_issue}
          />
          <ProgressInfo>
            <span>{Math.round(progressNum * 100 * 10) / 10}%</span>
            <span>
              열린 이슈{open_issue} 닫힌 이슈{close_issue}
            </span>
          </ProgressInfo>
        </ProgressArea>
      </TableRightSide>
    </S.IssueTable>
  );
}

const TableLeftSide = styled(CommonS.ColumnFlex)`
  gap: 8px;
`;

const MilestoneInfo = styled.div`
  display: flex;

  & img {
    margin-right: 8px;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
  }
`;

const MilestoneTitle = styled.span``;

const MilestoneEndDate = styled.span`
  color: rgba(110, 113, 145, 1);
  font-size: 12px;
`;

const BlueMilestoneIcon = styled.img`
  filter: invert(42%) sepia(85%) saturate(5574%) hue-rotate(202deg)
    brightness(105%) contrast(108%);
`;

const MilestoneDescription = styled.div`
  min-height: 20px;
  color: rgba(110, 113, 145, 1);
`;

const TableRightSide = styled(CommonS.ColumnFlex)`
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
`;

const ButtonArea = styled.div`
  display: flex;
  gap: 16px;
`;

const ProgressArea = styled(CommonS.ColumnFlex)`
  width: 224px;
`;

const ProgressInfo = styled(CommonS.SpaceBetween)`
  width: 100%;

  & span {
    color: rgba(110, 113, 145, 1);
    font-size: 12px;
  }
`;
