import * as S from "./popupStyle";
import { useCurrentUser } from "../../contexts/CurrentUserProvider";
import { FilteringState } from "../../Model/types";

interface GeneralPopupProps {
  setFilteringState: (item: FilteringState) => void;
  closePopup: () => void;
}

export default function FilterPopup({
  setFilteringState,
  closePopup,
}: GeneralPopupProps) {
  const { currentUser } = useCurrentUser();

  return (
    <S.DropdownPanel>
      <S.DropdownHeader>마일스톤 설정</S.DropdownHeader>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>열린 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          onChange={() => {
            setFilteringState({
              isOpen: true,
              assignee: [],
              label: [],
              milestone: [],
              reporter: [],
              comment: [],
            });
            closePopup();
          }}
        />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>내가 작성한 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          value={currentUser?.name || ""}
          onChange={(e) => {
            setFilteringState({
              isOpen: true,
              assignee: [],
              label: [],
              milestone: [],
              reporter: [e.target.value],
              comment: [],
            });
            closePopup();
          }}
        />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>나에게 할당된 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          value={currentUser?.name || ""}
          onChange={(e) => {
            setFilteringState({
              isOpen: true,
              assignee: [e.target.value],
              label: [],
              milestone: [],
              reporter: [],
              comment: [],
            });
            closePopup();
          }}
        />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>내가 댓글을 남긴 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          value={currentUser?.name || ""}
          onChange={(e) => {
            setFilteringState({
              isOpen: true,
              assignee: [],
              label: [],
              milestone: [],
              reporter: [],
              comment: [e.target.value],
            });
            closePopup();
          }}
        />
      </S.DropdownOption>
      <S.DropdownOption>
        <S.OptionInfo>
          <span>닫힌 이슈</span>
        </S.OptionInfo>
        <input
          type="radio"
          onChange={() => {
            setFilteringState({
              isOpen: false,
              assignee: [],
              label: [],
              milestone: [],
              reporter: [],
              comment: [],
            });
            closePopup();
          }}
        />
      </S.DropdownOption>
    </S.DropdownPanel>
  );
}
