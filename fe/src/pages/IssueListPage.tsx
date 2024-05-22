import { useState } from "react";
import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import labelIcon from "../assets/label.svg";
import milestoneIcon from "../assets/milestone.svg";
import { IssueData, FilteringState } from "../Model/types";
import { Link } from "react-router-dom";
import IssueTableHeader from "../components/IssueTableHeader";
import TableItems from "../components/IssueTableItems";
import usePopup from "../hooks/usePopup";
import { PopupType } from "../hooks/usePopup";
import FilterPopup from "../components/popup/FilterPopup";
import Overlay from "../components/popup/Overlay";
import useApi from "../hooks/api/useApi";

const initialFilteringState = {
  isOpen: true,
  assignee: [],
  label: [],
  milestone: [],
  reporter: [],
  comment: [],
};

export default function IssueListPage() {
  const { currentUser } = useCurrentUser();
  const { popupState, dispatch: popupDispatch } = usePopup();
  const { data: issueList, isLoading: isIssueListLoading } =
    useApi<IssueData>("/issue");
  const [filteringState, setFilteringState] = useState<FilteringState>(
    initialFilteringState
  );

  if (isIssueListLoading) {
    return <div>Loading...</div>;
  }

  if (!issueList) {
    return null;
  }
  const { close_Issues, open_Issues } = issueList;

  const handleFilterInTableHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFilteringState((prevState) => ({
      ...prevState,
      [key]: [e.target.value],
    }));
  };

  const handleOpenPopup = (popupType: PopupType) => {
    popupDispatch({ type: "openPopup", popup: popupType });
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <TapAndFilterWrapper>
          <FilterBar>
            <FilterBtn onClick={() => handleOpenPopup("filter")}>
              <span>필터</span>
              <img src={dropdownIcon} alt="dropdown" />
            </FilterBtn>
            {popupState.filter && (
              <FilterPopup
                setFilteringState={setFilteringState}
                closePopup={() => popupDispatch({ type: "closePopup" })}
              />
            )}
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
            <IssueCreationButton to="/issue">+ 이슈 작성</IssueCreationButton>
          </ButtonsWrapper>
        </TapAndFilterWrapper>
        <IssueTableHeader
          filteringState={filteringState}
          setFilteringState={setFilteringState}
          issueList={issueList}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={() => popupDispatch({ type: "closePopup" })}
          popupState={popupState}
          handleFilterInTableHeader={handleFilterInTableHeader}
        />
        {filteringState.isOpen && <TableItems items={open_Issues} />}
        {!filteringState.isOpen && <TableItems items={close_Issues} />}
        <Overlay
          popupState={popupState}
          closePopup={() => popupDispatch({ type: "closePopup" })}
        />
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
  align-items: center;
  border-right: 1px solid rgba(217, 219, 233, 1);
  cursor: pointer;

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
  width: 465px;
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

const IssueCreationButton = styled(Link)`
  width: 128px;
  height: 100%;
  background-color: rgba(0, 122, 255, 1);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  padding: 10px 25px;
`;
