import { styled } from "styled-components";
import { User } from "../../type/types";
import * as S from "./popupStyle";

interface UserPopupProps {
  userList: User[];
  selectedUserList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType: string;
  isAssigneeNone: boolean;
  headerTitle: string;
}

export default function UserPopup({
  userList,
  selectedUserList,
  onChange,
  inputType,
  isAssigneeNone,
  headerTitle,
}: UserPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>{headerTitle} 설정</S.DropdownHeader>
      {isAssigneeNone && (
        <S.DropdownOption>
          <S.OptionInfo>
            <span>담당자가 없는 이슈</span>
          </S.OptionInfo>
          <input
            type={inputType}
            id={"none"}
            name="label"
            value={"none"}
            checked={selectedUserList.includes("none")}
            onChange={onChange}
          />
        </S.DropdownOption>
      )}
      {userList.map((item) => {
        const { name, image_path } = item;
        return (
          <S.DropdownOption key={`assignee-${name}`}>
            <S.OptionInfo>
              <AssigneeImg src={image_path} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type={inputType}
              id={name}
              name="label"
              value={name}
              checked={selectedUserList.includes(name)}
              onChange={onChange}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}

const AssigneeImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
`;
