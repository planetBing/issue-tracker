import * as S from "./popupStyle";
import { Milestone } from "../../model/types";

interface MilestonePopupProps {
  milestoneList: Milestone[];
  selectedMilestone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isMilestoneNone: boolean;
}

export default function MilestonePopup({
  milestoneList,
  selectedMilestone,
  onChange,
  isMilestoneNone,
}: MilestonePopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>마일스톤 설정</S.DropdownHeader>
      {isMilestoneNone && (
        <S.DropdownOption>
          <S.OptionInfo>
            <span>마일스톤이 없는 이슈</span>
          </S.OptionInfo>
          <input
            type="radio"
            id={"none"}
            name="label"
            value={"none"}
            checked={selectedMilestone === "none"}
            onChange={onChange}
          />
        </S.DropdownOption>
      )}
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
              checked={selectedMilestone.toString() === id.toString()}
              onChange={onChange}
            />
          </S.DropdownOption>
        );
      })}
    </S.DropdownPanel>
  );
}
