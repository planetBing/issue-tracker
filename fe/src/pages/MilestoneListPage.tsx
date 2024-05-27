import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import useApi from "../hooks/api/useApi";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import * as S from "../styles/tableItems";
import LabelMilestoneTap from "../components/LabelMilestoneTap";
import { Milestone } from "../Model/types";
import alertIcon from "../assets/alertCircle.svg";
import archiveIcon from "../assets/archive.svg";

import { useState } from "react";
import MilestoneTableItems from "../components/MilestoneTableItems";

export default function MilestoneListPage() {
  const { currentUser } = useCurrentUser();
  const { data: milestoneListData } = useApi<Milestone[]>("/milestone");
  const [isOpenMode, setIsOpenMode] = useState<boolean>(true);

  const openMilestones = milestoneListData?.filter(
    (milestone) => milestone.is_open
  );
  const closedMilestones = milestoneListData?.filter(
    (milestone) => !milestone.is_open
  );
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <S.LabelPageHeader>
          <LabelMilestoneTap />
          <S.AddLabelBtn>+ 마일스톤 추가</S.AddLabelBtn>
        </S.LabelPageHeader>
        <S.IssueTableTop>
          <OpenIssueTap
            onClick={() => setIsOpenMode(true)}
            isactive={isOpenMode ? "true" : "false"}
          >
            <img src={alertIcon} alt="open icon" />
            <span>열린 마일스톤({openMilestones?.length})</span>
          </OpenIssueTap>
          <ClosedIssueTap
            onClick={() => setIsOpenMode(false)}
            isactive={!isOpenMode ? "true" : "false"}
          >
            <img src={archiveIcon} alt="closed icon" />
            <span>닫힌 마일스톤({closedMilestones?.length})</span>
          </ClosedIssueTap>
        </S.IssueTableTop>
        {isOpenMode &&
          openMilestones?.map((milestoneObj) => {
            const { id } = milestoneObj;
            return (
              <MilestoneTableItems
                key={`milestoneList-${id}`}
                milestoneObj={milestoneObj}
              />
            );
          })}
        {!isOpenMode &&
          closedMilestones?.map((milestoneObj) => {
            const { id } = milestoneObj;
            return (
              <MilestoneTableItems
                key={`milestoneList-${id}`}
                milestoneObj={milestoneObj}
              />
            );
          })}
      </CommonS.Wrapper>
    </>
  );
}

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
