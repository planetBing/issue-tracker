import * as S from "./popupStyle";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";

interface GeneralPopupProps {
  closePopup: () => void;
}

export default function FilterPopup({ closePopup }: GeneralPopupProps) {
  const { currentUser } = useCurrentUser();
  const popupItems = [
    "내가 작성한 이슈",
    "나에게 할당된 이슈",
    "내가 댓글을 남긴 이슈",
  ];

  return (
    <S.DropdownPanel>
      <S.DropdownHeader>마일스톤 설정</S.DropdownHeader>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>열린 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          name="label"
          value={"true"}
          onChange={() => {
            closePopup();
          }}
        />
      </S.DropdownOption>
      {popupItems.map((item, index) => {
        return (
          <S.DropdownOption key={`이슈 필터-${index}`}>
            <S.OptionInfo>
              <span>{item}</span>
            </S.OptionInfo>
            <input
              type="radio"
              name="label"
              value={currentUser?.name || ""}
              onChange={() => {
                closePopup();
              }}
            />
          </S.DropdownOption>
        );
      })}
      <S.DropdownOption>
        <S.OptionInfo>
          <span>닫힌 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          name="label"
          value={"false"}
          onChange={() => {
            closePopup();
          }}
        />
      </S.DropdownOption>
    </S.DropdownPanel>
  );
}
