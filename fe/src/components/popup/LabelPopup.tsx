import * as S from "./popupStyle";
import { styled } from "styled-components";
import { Label } from "../../type/types";

interface LabelPopupProps {
  labelList: Label[];
  selectedLabel: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLabelNone: boolean;
  inputType: string;
}

export default function LabelPopup({
  labelList,
  selectedLabel,
  onChange,
  isLabelNone,
  inputType,
}: LabelPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>레이블 설정</S.DropdownHeader>
      {isLabelNone && (
        <S.DropdownOption>
          <S.OptionInfo>
            <span>라벨이 없는 이슈</span>
          </S.OptionInfo>
          <input
            type={inputType}
            id={"none"}
            name="label"
            value={"none"}
            checked={selectedLabel.includes("none")}
            onChange={onChange}
          />
        </S.DropdownOption>
      )}
      {labelList.map((item) => {
        const { id, name, background_color } = item;
        return (
          <S.DropdownOption key={`labelPopupOtion-${name}`}>
            <S.OptionInfo>
              <LabelColorCircle color={background_color} />
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type={inputType}
              id={name}
              name="label"
              value={id.toString()}
              checked={selectedLabel.includes(id.toString())}
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
