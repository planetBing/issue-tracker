import styled from "styled-components";
import UserInfo from "../general/UserInfo";
import * as CommonS from "../../styles/common";
import { Comment } from "../../model/types";
import smileIcon from "../../assets/smile.svg";
import greyEditIcon from "../../assets/greyEdit.svg";
import { marked } from "marked";

interface WrittenCommentProps {
  commentObj: Comment;
  issueReporter: string;
}

export default function WrittenComment({
  commentObj,
  issueReporter,
}: WrittenCommentProps) {
  const { id, reporter: commentReporter, contents, created_at } = commentObj;
  const convertedHtml = marked.parse(contents) as string;

  return (
    <WrittenCommentBox key={id}>
      <CommentHeader>
        <UserInfoAndTimeStamp>
          <UserInfo
            image_path={commentReporter.image_path}
            name={commentReporter.name}
          />
          <span>{created_at}</span>
        </UserInfoAndTimeStamp>
        <CommentButtonBox>
          {commentReporter.name === issueReporter && (
            <ReporterLabel>작성자</ReporterLabel>
          )}
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
      <CommentBody dangerouslySetInnerHTML={{ __html: convertedHtml }} />
    </WrittenCommentBox>
  );
}

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

  & img {
    max-width: 50%;
    height: auto;
  }
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
