import { styled } from "styled-components";
import { calculateMilestoneProgress } from "../utils/utils";

interface MilestoneProgressBarProps {
  openIssuesNum: number;
  closedIsseusNum: number;
}

export default function MilestoneProgressBar({
  openIssuesNum,
  closedIsseusNum,
}: MilestoneProgressBarProps) {
  const progressNum = calculateMilestoneProgress(
    openIssuesNum,
    closedIsseusNum
  );
  return (
    <ProgressBar>
      <FilledProgressBar $length={progressNum} />
    </ProgressBar>
  );
}

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
