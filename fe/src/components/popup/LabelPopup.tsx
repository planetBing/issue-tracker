import * as S from "./popupStyle";
import { styled } from "styled-components";
import { Label } from "../../Model/types";

interface LabelPopupProps {
  labelList: Label[];
  // handleInputLabel: (item: Label) => void;
  // closePopup: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LabelPopup({ labelList, onChange }: LabelPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>레이블 설정</S.DropdownHeader>
      {labelList.map((item) => {
        const { name, background_color } = item;
        return (
          <S.DropdownOption key={`label-${name}`}>
            <S.OptionInfo>
              <LabelColorCircle color={background_color} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type="radio"
              id={name}
              name="label"
              value={name}
              onChange={onChange}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}

const LabelColorCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  margin-right: 8px;
`;
