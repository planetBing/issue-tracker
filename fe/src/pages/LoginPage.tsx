import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import LargeLogo from "../assets/logo_large.svg";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      <img src={LargeLogo} alt="largeLogo" />
      <LoginWrapper>
        <GithubLogin>GitHub 계정으로 로그인</GithubLogin>
        <Or>or</Or>
        <LoginTextArea>
          <input type="text" id="user_name" required />
          <label htmlFor="user_name">
            <span>아이디</span>
          </label>
        </LoginTextArea>
        <LoginTextArea>
          <input type="password" id="user_pw" required />
          <label htmlFor="user_pw">
            <span>비밀번호</span>
          </label>
        </LoginTextArea>
        <LoginButton onClick={handleLogin}>아이디로 로그인</LoginButton>
        <JoinBtn>회원가입</JoinBtn>
      </LoginWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 342px;
  margin: 150px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    margin-bottom: 50px;
  }
`;

const LoginWrapper = styled.div`
  width: 320px;
  text-align: center;
`;

const GithubLogin = styled.button`
  width: 100%;
  height: 56px;
  border: 1px solid rgba(0, 122, 255, 1);
  color: rgba(0, 122, 255, 1);
  border-radius: 10px;
  font-size: large;
  background-color: transparent;
  cursor: pointer;
`;

const Or = styled.div`
  color: rgba(110, 113, 145, 1);
  font-size: 16px;
  line-height: 26px;
  margin-top: 8px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 10px;
  font-size: large;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  cursor: pointer;
`;

const JoinBtn = styled.div`
  color: rgba(78, 75, 102, 1);
  font-size: 16px;
  font-weight: 500;
  margin-top: 16px;
  cursor: pointer;
`;

const LoginTextArea = styled.p`
  position: relative;
  width: 100%;
  height: 50px;

  input {
    box-sizing: border-box;
    padding: 16px 0 0;
    width: 100%;
    height: 56px;
    border: 0 none;
    color: rgba(78, 75, 102, 1);
    background-color: rgba(239, 240, 246, 1);
    outline: none;
    border-radius: 10px;
    padding-left: 16px;

    &:focus,
    &:valid {
      background-color: white;
    }

    &:focus + label span,
    &:valid + label span {
      transform: translateY(-100%);
      font-size: 12px;
      color: rgba(110, 113, 145, 1);
    }

    &:focus + label::after,
    &:valid + label::after {
      width: 100%;
      transform: translateX(0);
    }
  }

  label {
    position: absolute;
    left: 0%;
    bottom: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 2px;
      width: 0;
      height: 100%;
      transition: all 0.3s ease;
    }

    span {
      position: absolute;
      left: 16px;
      bottom: 11px;
      transition: all 0.3s ease;
      font-size: 16px;
      color: rgba(110, 113, 145, 1);
      font-weight: 500;
    }
  }
`;
