import { styled } from "styled-components";

interface UserInfoProps {
  image_path: string;
  name: string;
}

export default function UserInfo({ image_path, name }: UserInfoProps) {
  return (
    <UserInfoBox>
      <UserImg src={image_path} />
      <span>{name}</span>
    </UserInfoBox>
  );
}

const UserInfoBox = styled.div`
  display: flex;

  & span {
    font-weight: 500;
    font-size: 16px;
    color: rgba(78, 75, 102, 1);
  }
`;

const UserImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;
