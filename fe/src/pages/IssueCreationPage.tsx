import { styled } from "styled-components";
import { loggedInUserImageSrc } from "../constants/constants";
import SideBar from "../components/SideBar";

export default function IssueCreationPage() {
  return (
    <>
      <Header>
        <div>Issue Tracker</div>
        <LoggedInUserImage src={loggedInUserImageSrc} alt="loggedInUserImage" />
      </Header>
      <Wrapper>
        <PageTitle>새로운 이슈 작성</PageTitle>
        <Main>
          <LoggedInUserImage
            src={loggedInUserImageSrc}
            alt="loggedInUserImage"
          />
          <TextArea>
            <input type="text" name="issueTitle" placeholder="제목"></input>
            <textarea
              name="comment"
              placeholder="코멘트를 입력하세요"
            ></textarea>
          </TextArea>
          <SideBar />
        </Main>
        <ButtonArea>
          <span>x 작성취소</span>
          <DoneBtn>완료</DoneBtn>
        </ButtonArea>
      </Wrapper>
    </>
  );
}

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoggedInUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Header = styled(SpaceBetween)`
  width: 1280px;
  display: flex;
  justify-content: space-between;
  margin: 27px auto;

  & div {
    font-size: 32px;
    line-height: 40px;
    font-style: italic;
    width: 199px;
  }
`;

const PageTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 85px;
`;

const Main = styled(SpaceBetween)`
  border-top: 1px solid rgba(217, 219, 233, 1);
  border-bottom: 1px solid rgba(217, 219, 233, 1);
  padding: 24px 0;
`;

const Wrapper = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled(ColumnFlex)`
  display: flex;
  flex-direction: column;
  width: 912px;

  & input {
    height: 56px;
    border: none;
    padding: 0 16px;
    background-color: rgba(239, 240, 246, 1);
    border-radius: 16px;
    margin-bottom: 7px;
  }

  & input:focus {
    outline: none;
  }

  & textarea {
    height: 400px;
    border: none;
    padding: 16px;
    background-color: rgba(239, 240, 246, 1);
    border-radius: 16px;
  }

  & textarea:focus {
    outline-color: black;
    background-color: white;
  }
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 25px;

  & span {
    margin-right: 32px;
    color: rgba(78, 75, 102, 1);
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
  }
`;

const DoneBtn = styled.button`
  border: none;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  width: 240px;
  height: 56px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
`;
