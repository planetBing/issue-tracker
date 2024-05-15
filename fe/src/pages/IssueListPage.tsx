import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import labelIcon from "../assets/label.svg";
import milestoneIcon from "../assets/milestone.svg";

export default function IssueListPage() {
  const { currentUser } = useCurrentUser();
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <TapAndFilterWrapper>
          <FilterBar>
            <FilterBtn>
              <span>필터</span>
              <img src={dropdownIcon} alt="dropdown" />
            </FilterBtn>
            <FilterSearchBox>
              <img src={searchIcon} alt="serch icon" />
              <input placeholder="is: issue is:open" />
            </FilterSearchBox>
          </FilterBar>
          <ButtonsWrapper>
            <TapBox>
              <TapButton>
                <img src={labelIcon} alt="label icon" />
                레이블(3)
              </TapButton>
              <TapButton>
                <img src={milestoneIcon} alt="milestone icon" />
                마일스톤(2)
              </TapButton>
            </TapBox>
            <IssueCreationButton>+ 이슈 작성</IssueCreationButton>
          </ButtonsWrapper>
        </TapAndFilterWrapper>
      </CommonS.Wrapper>
    </>
  );
}

const TapAndFilterWrapper = styled(CommonS.SpaceBetween)`
  height: 40px;
`;

const FilterBar = styled.div`
  width: 560px;
  height: 100%;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  border: 1px solid rgba(217, 219, 233, 1);
`;

const FilterBtn = styled(CommonS.SpaceBetween)`
  background-color: rgba(247, 247, 252, 1);
  height: 100%;
  padding: 0 24px;
  align-items: center;
  width: 128px;
  box-sizing: border-box;
  align-items: center;
  border-right: 1px solid rgba(217, 219, 233, 1);

  span {
    color: rgba(78, 75, 102, 1);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
`;

const FilterSearchBox = styled.div`
  width: 431px;
  background-color: rgba(239, 240, 246, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 359px;
    color: rgba(110, 113, 145, 1);
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    background-color: transparent;
    border: none;
    margin-left: 8px;
  }
`;

const ButtonsWrapper = styled(CommonS.SpaceBetween)`
  align-items: center;
  width: 456px;
  height: 100%;
`;

const TapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100%;
  border: 1px solid rgba(217, 219, 233, 1);
  border-radius: 12px;
  overflow: hidden;
`;

const TapButton = styled.div`
  width: 159.5px;
  height: 100%;
  background-color: rgba(247, 247, 252, 1);
  color: rgba(78, 75, 102, 1);
  font-size: 16px;
  border-right: 1px solid rgba(217, 219, 233, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border: none;
  }

  img {
    margin-right: 4px;
  }
`;

const IssueCreationButton = styled.button`
  width: 128px;
  height: 100%;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  border: none;
  border-radius: 10px;
`;
