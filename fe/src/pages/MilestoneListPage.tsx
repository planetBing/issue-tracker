import PageHeader from "../components/PageHeader";
import useApi from "../hooks/api/useApi";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import * as S from "../styles/labelMilstoneStyle";
import LabelMilestoneTap from "../components/LabelMilestoneTap";
import { Milestone } from "../Model/types";

export default function MilestoneListPage() {
  const { currentUser } = useCurrentUser();
  const { data: milestoneListData } = useApi<Milestone[]>("/label");
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <S.LabelPageHeader>
          <LabelMilestoneTap />
          <S.AddLabelBtn>+ 마일스톤 추가</S.AddLabelBtn>
        </S.LabelPageHeader>
        <S.IssueTableTop></S.IssueTableTop>
        {milestoneListData?.map((milestoneObj) => {
          const { id } = milestoneObj;
          return <S.IssueTable key={`milestoneList-${id}`}></S.IssueTable>;
        })}
      </CommonS.Wrapper>
    </>
  );
}
