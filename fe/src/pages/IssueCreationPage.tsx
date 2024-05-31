import { useState, useEffect } from "react";
import { styled } from "styled-components";
import PageHeader from "../components/general/PageHeader";
import SideBar from "../components/general/SideBar";
import * as CommonS from "../styles/common";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { useNavigate } from "react-router-dom";
import CommentWriteArea from "../components/comment/CommentWriteArea";

const SERVER = process.env.REACT_APP_SERVER;

export default function IssueCreationPage() {
  const { currentUser } = useCurrentUser();
  const [issueTitle, setIssueTitle] = useState<string>("");
  const [comment, setComment] = useState<string | null>(null);
  //담당자, 라벨, 마일스톤 상태 관리 방식 변경 예정
  const [assigneeList, setAssigneeList] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const [selectedMilestone, setSelectedMilestone] = useState<string>("");
  const [isIssueTitleFilled, setIsIssueTitleFilled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleInputIssueTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setIssueTitle(titleValue);
    setIsIssueTitleFilled(titleValue.trim() !== "");
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleInputAssignee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (assigneeList.includes(value)) {
      const newAssigneeList = assigneeList.filter(
        (assignee) => assignee !== value
      );
      setAssigneeList(newAssigneeList);
    } else {
      setAssigneeList([...assigneeList, e.target.value]);
    }
  };

  const handleInputLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedLabel.includes(value)) {
      const newSelectedLabel = selectedLabel.filter((label) => label !== value);
      setSelectedLabel(newSelectedLabel);
    } else {
      setSelectedLabel([...selectedLabel, e.target.value]);
    }
  };

  const handleInputMilestone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMilestone(e.target.value);
  };

  const postIssue = async () => {
    const issueCreationData = {
      reporter: currentUser?.name,
      title: issueTitle,
      comment: comment,
      assignee: assigneeList.length ? assigneeList : null,
      label_id: selectedLabel.length
        ? selectedLabel.map((labelId) => Number(labelId))
        : null,
      milestone_id: selectedMilestone.length ? Number(selectedMilestone) : null,
    };
    try {
      const response = await fetch(`${SERVER}/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueCreationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      navigate(`/issue/${data}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <Wrapper>
        <PageTitle>새로운 이슈 작성</PageTitle>
        <Main>
          <LoggedInUserImage
            src={currentUser?.image_path}
            alt="loggedInUserImage"
          />
          <TextContainer>
            <IssueTitle
              type="text"
              name="issueTitle"
              placeholder="제목"
              onChange={handleInputIssueTitle}
            ></IssueTitle>
            <CommentWriteArea
              handleInputComment={handleInputComment}
              comment={comment}
              height={"448px"}
            />
          </TextContainer>
          <SideBar
            handleInputLabel={handleInputLabel}
            handleInputMilestone={handleInputMilestone}
            handleInputAssignee={handleInputAssignee}
            assigneeList={assigneeList}
            selectedLabel={selectedLabel}
            selectedMilestone={selectedMilestone}
          />
        </Main>
        <ButtonArea>
          <CancelBtn to="/">x 작성취소</CancelBtn>
          <DoneBtn onClick={postIssue} disabled={!isIssueTitleFilled}>
            완료
          </DoneBtn>
        </ButtonArea>
      </Wrapper>
    </>
  );
}

const LoggedInUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const PageTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 85px;
`;

const Main = styled(CommonS.SpaceBetween)`
  border-top: 1px solid rgba(217, 219, 233, 1);
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  padding: 24px 0;
`;

const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const TextContainer = styled(CommonS.ColumnFlex)`
  display: flex;
  flex-direction: column;
  width: 912px;
`;

const IssueTitle = styled.input`
  height: 56px;
  border: none;
  padding: 0 16px;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 16px;
  margin-bottom: 7px;

  &:focus {
    outline: none;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 25px;
`;

const CancelBtn = styled(Link)`
  margin-right: 32px;
  color: rgba(78, 75, 102, 1);
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
`;

const DoneBtn = styled.button<{ disabled: boolean }>`
  border: none;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  width: 240px;
  height: 56px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  opacity: ${({ disabled }) => (disabled ? "37%" : "100%")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
