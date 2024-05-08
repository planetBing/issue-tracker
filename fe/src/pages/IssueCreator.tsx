import { styled } from "styled-components";

const LoggedInUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Header = styled.header`
  width: 100%;

  & div {
    font-size: 32px;
    line-height: 40px;
    font-style: italic;
    margin: 27px 80px;
    width: 199px;
  }
`;

const PageTitle = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 85px;
`;

const Main = styled.main`
  display: flex;
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
    height: 448px;
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

export default function IssueCreator() {
  return (
    <>
      <Header>
        <div>Issue Tracker</div>
      </Header>
      <Wrapper>
        <PageTitle>새로운 이슈 작성</PageTitle>
        <Main>
          <LoggedInUserImage
            src="https://s3-alpha-sig.figma.com/img/bfa1/72b0/77fbdbfc84f8ad555402b23fb6c7a0ed?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eI0HusP8AQJhfrYkbdft4etLT-322gDp7B7Px-jCgKq9YxT-2fFKD4o6AhzmnVaFjLWGiHP0xS~kATP~GzdJOyVdsfc4UEryn1QuF2T9PmoEdt0ZnUR7bqsSHuOReoVWy67p4Drl~meTCSGbWn8amC1-vFCT23Coy9HLU9fkNA0r3uh47-NMSV-Wx7IwUF202FHxOo027XQFyYGP9Xu56j19~mvu0d9TAlW~oHGscTheXQL5afzDdwBFrEGbMgU2Lli2QKdpkrDnjUKb0mRtqWOAVPU45~RZnFemwVP2UKq~e9Q68Q5u4zzvqrlcXbcTyHjkgYGiD6vSTPX-AlMiHA__"
            alt="loggedInUserImage"
          />
          <ColumnFlex>
            <input type="text" name="issueTitle" placeholder="제목"></input>
            <textarea
              name="comment"
              placeholder="코멘트를 입력하세요"
            ></textarea>
          </ColumnFlex>
        </Main>
      </Wrapper>
    </>
  );
}
