import * as S from "./popupStyle";

export default function IssueStatusPopup() {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>이슈 상태 변경</S.DropdownHeader>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>선택한 이슈 열기</span>
        </S.OptionInfo>
        <input type="radio" />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>선택한 이슈 닫기</span>
        </S.OptionInfo>
        <input type="radio" />
      </S.DropdownOption>
    </S.DropdownPanel>
  );
}
