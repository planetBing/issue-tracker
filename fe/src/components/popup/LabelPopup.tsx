import * as S from "./popupStyle";
import { styled } from "styled-components";
import { Label } from "../../Model/types";

interface LabelPopupProps {
  labelList: Label[];
  handleInputLabel: (item: Label) => void;
  closePopup: () => void;
}

export default function LabelPopup({
  labelList,
  handleInputLabel,
  closePopup,
}: LabelPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>레이블 설정</S.DropdownHeader>
      {labelList.map((item) => {
        const { name, backgroundColor } = item;
        return (
          <S.DropdownOption key={`label-${name}`}>
            <S.OptionInfo>
              <LabelColorCircle color={backgroundColor} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type="radio"
              id={name}
              name="label"
              value={name}
              onChange={() => {
                handleInputLabel(item);
                closePopup();
              }}
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
