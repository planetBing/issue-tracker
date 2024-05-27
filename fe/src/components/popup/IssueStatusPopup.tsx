import * as S from "./popupStyle";

interface IssueStatusPopupProps {
  openOrCloseIssues: (status: string) => Promise<void>;
}

export default function IssueStatusPopup({
  openOrCloseIssues,
}: IssueStatusPopupProps) {
  return (
    <S.DropdownPanel>
      <S.DropdownHeader>이슈 상태 변경</S.DropdownHeader>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>선택한 이슈 열기</span>
        </S.OptionInfo>
        <input
          type="radio"
          onChange={() => {
            openOrCloseIssues("open");
          }}
        />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>선택한 이슈 닫기</span>
        </S.OptionInfo>
        <input type="radio" onChange={() => openOrCloseIssues("close")} />
      </S.DropdownOption>
    </S.DropdownPanel>
  );
}
