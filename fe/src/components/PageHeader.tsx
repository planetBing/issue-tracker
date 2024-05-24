import { styled } from "styled-components";
import * as CommonS from "../styles/common";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  loggedInUserImageSrc: string | undefined;
}

export default function PageHeader({ loggedInUserImageSrc }: PageHeaderProps) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <Header>
      <div onClick={handleNavigation}>Issue Tracker</div>
      <LoggedInUserImage src={loggedInUserImageSrc} alt="loggedInUserImage" />
    </Header>
  );
}

const LoggedInUserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Header = styled(CommonS.SpaceBetween)`
  width: 1280px;
  display: flex;
  justify-content: space-between;
  margin: 27px auto;

  & div {
    font-size: 32px;
    line-height: 40px;
    font-style: italic;
    width: 199px;
    cursor: pointer;
  }
`;
