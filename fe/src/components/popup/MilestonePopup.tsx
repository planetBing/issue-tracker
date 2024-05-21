import * as S from "./popupStyle";
import { Milestone } from "../../Model/types";

interface MilestonePopupProps {
  milestoneList: Milestone[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MilestonePopup({
  milestoneList,
  onChange,
}: MilestonePopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>마일스톤 설정</S.DropdownHeader>
      {milestoneList.map((item) => {
        const { id, name } = item;
        return (
          <S.DropdownOption key={`milestone-${id}`}>
            <S.OptionInfo>
              <span>{name}</span>
            </S.OptionInfo>
            <input
              type="radio"
              id={name}
              name="label"
              value={id}
              onChange={onChange}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}
