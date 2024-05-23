import { issueDetails } from "./issueDetailsMockData";
import { styled } from "styled-components";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import editIcon from "../assets/edit.svg";
import archiveIcon from "../assets/archive.svg";
import alertIcon from "../assets/alertCircle.svg";
import smileIcon from "../assets/smile.svg";
import greyEditIcon from "../assets/greyEdit.svg";

import PageHeader from "../components/PageHeader";
import UserInfo from "../components/UserInfo";

export default function IssueDetailsPage() {
  const { currentUser } = useCurrentUser();
  const { title, id, isOpen, create_at, reporter, comment } = issueDetails;
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <PostInfo>
          <IssueTitleBox>
            <IssueTitle>
              {title}
              <span>#{id}</span>
            </IssueTitle>
            <IssueButtonsBox>
              <TitleEditBtn>
                <img src={editIcon} alt="edit icon" />
                제목 편집
              </TitleEditBtn>
              <OpenIssueBtn>
                <img src={archiveIcon} alt="archive icon" />
                {isOpen ? "이슈 닫기" : "이슈 열기"}
              </OpenIssueBtn>
            </IssueButtonsBox>
          </IssueTitleBox>
          <StatesInfoBox>
            <InfoTag>
              <CommonS.Center>
                <img src={alertIcon} alt="alert icon" />
                <span>{isOpen ? "열린 이슈" : "닫힌 이슈"}</span>
              </CommonS.Center>
            </InfoTag>
            <OpenInfo>
              이 이슈가 {create_at}에 {reporter.name}에 의해 열렸습니다 ∙ 코멘트{" "}
              {comment.length}개
            </OpenInfo>
          </StatesInfoBox>
        </PostInfo>
        <CommentAndSideBarContainer>
          <CommentContainer>
            {comment.map(({ id, reporter, contents, create_at }) => {
              return (
                <WrittenCommentBox key={id}>
                  <CommentHeader>
                    <UserInfoAndTimeStamp>
                      <UserInfo
                        image_path={reporter.image_path}
                        name={reporter.name}
                      />
                      <span>{create_at}</span>
                    </UserInfoAndTimeStamp>
                    <CommentButtonBox>
                      <ReporterLabel>작성자</ReporterLabel>
                      <div>
                        <img src={greyEditIcon} alt="edit icon" />
                        편집
                      </div>
                      <div>
                        <img src={smileIcon} alt="smile icon" />
                        반응
                      </div>
                    </CommentButtonBox>
                  </CommentHeader>
                  <CommentBody>{contents}</CommentBody>
                </WrittenCommentBox>
              );
            })}
          </CommentContainer>
        </CommentAndSideBarContainer>
      </CommonS.Wrapper>
    </>
  );
}

const IssueTitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`;

const IssueTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;

  & span {
    margin: 0 8px;
    color: rgba(110, 113, 145, 1);
    font-weight: 700;
  }
`;

const IssueButtonsBox = styled.div`
  display: flex;
  gap: 8px;
`;

const TitleEditBtn = styled.button`
  color: rgba(0, 122, 255, 1);
  border: 1px solid rgba(0, 122, 255, 1);
  padding: 0 16px;
  width: 128px;
  height: 40px;
  background-color: transparent;
  border-radius: 10px;
  & img {
    margin-right: 5px;
  }
`;

const OpenIssueBtn = styled(TitleEditBtn)`
  & img {
    filter: invert(30%) sepia(99%) saturate(2526%) hue-rotate(199deg)
      brightness(101%) contrast(105%);
  }
`;

const PostInfo = styled(CommonS.ColumnFlex)`
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  margin-bottom: 24px;
`;

const StatesInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoTag = styled(CommonS.Center)`
  width: 101px;
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
  color: rgba(254, 254, 254, 1);
  background-color: rgba(0, 122, 255, 1);
  border-radius: 30px;

  & img {
    filter: invert(93%) sepia(100%) saturate(0%) hue-rotate(264deg)
      brightness(115%) contrast(99%);
    margin-right: 8px;
  }
`;

const OpenInfo = styled.p`
  color: rgba(110, 113, 145, 1);
  font-size: 16px;
  line-height: 24px;
  margin: 0 8px;
`;

const CommentAndSideBarContainer = styled(CommonS.SpaceBetween)``;

const CommentContainer = styled.div`
  width: 960px;
`;

const WrittenCommentBox = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const CommentHeader = styled(CommonS.SpaceBetween)`
  width: 100%;
  height: 64px;
  padding: 16px 24px;
  background-color: rgba(247, 247, 252, 1);
  border: 1px solid rgb(218, 219, 233);
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  align-items: center;
`;

const CommentBody = styled.div`
  width: 100%;
  background-color: rgba(254, 254, 254, 1);
  color: rgba(78, 75, 102, 1);
  padding: 16px 24px;
  border-bottom: 1px solid rgb(218, 219, 233);
  border-right: 1px solid rgb(218, 219, 233);
  border-left: 1px solid rgb(218, 219, 233);
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  white-space: pre-line;
  font-size: 16px;
  line-height: 24px;
`;

const UserInfoAndTimeStamp = styled.div`
  display: flex;
  gap: 8px;
  & span {
    color: rgba(110, 113, 145, 1);
    font-size: 16px;
  }
`;

const CommentButtonBox = styled.div`
  display: flex;
  gap: 16px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(78, 75, 102, 1);
    font-size: 12px;
  }
`;

const ReporterLabel = styled.div`
  background-color: rgba(239, 240, 246, 1);
  border: 1px solid rgba(217, 219, 233, 1);
  border-radius: 12px;
  width: 56px;
  height: 24px;
  font-size: 12px;
`;
