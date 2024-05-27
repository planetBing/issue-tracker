import queryString from "query-string";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import dropdownIcon from "../assets/dropdownIcon.svg";
import searchIcon from "../assets/search.svg";
import { IssueData, FilteringState } from "../Model/types";
import { Link } from "react-router-dom";
import IssueTableHeader from "../components/IssueTableHeader";
import TableItems from "../components/IssueTableItems";
import usePopup from "../hooks/usePopup";
import { PopupType } from "../hooks/usePopup";
import FilterPopup from "../components/popup/FilterPopup";
import Overlay from "../components/popup/Overlay";
import useApi from "../hooks/api/useApi";
import LabelMilestoneTap from "../components/LabelMilestoneTap";

const initialFilteringState = {
  isOpen: true,
  assignee: [],
  label: [],
  milestone: [],
  reporter: [],
  comment: [],
};

const OnlyFilteringClosedState = {
  isOpen: false,
  assignee: [],
  label: [],
  milestone: [],
  reporter: [],
  comment: [],
};

export default function IssueListPage() {
  const { currentUser } = useCurrentUser();
  const { popupState, dispatch: popupDispatch } = usePopup();

  const [filteringState, setFilteringState] = useState<FilteringState>(
    initialFilteringState
  );
  const paramString = queryString.stringify(filteringState);
  const {
    data: issueList,
    isLoading: isIssueListLoading,
    refetch: isssueListRefetch,
    putData: updateIssueStatus,
  } = useApi<IssueData>(`/issue/filter?${paramString}`);
  const [selectedIssue, setSelectedIssue] = useState<string[]>([]);

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

  const filterString = [
    `is: ${filteringState.isOpen ? "open" : "closed"}`,
    ...Object.entries(filteringState)
      .filter(([key, value]) => Array.isArray(value) && value.length > 0)
      .map(([key, value]) => `${key}:${value.join(",")}`),
  ].join(" ");

  const handleCheckIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (selectedIssue.includes(value)) {
      const newSelectedIssueList = selectedIssue.filter(
        (assignee) => assignee !== value
      );
      setSelectedIssue(newSelectedIssueList);
    } else {
      setSelectedIssue([...selectedIssue, e.target.value]);
    }
  };

  const handleCheckAllIssues = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIssueIds = (
        filteringState.isOpen ? open_Issues : close_Issues
      ).map((issue) => issue.id.toString());
      setSelectedIssue(allIssueIds);
    } else {
      setSelectedIssue([]);
    }
  };

  const openOrCloseIssues = (status: string) => {
    const putPath = status === "open" ? "/issue/open" : "/issue/close";
    const selectedIssueIds = selectedIssue.map((id) => Number(id));
    // updateIssueStatus(putPath, { issueIds: selectedIssueIds });
  };

  const isFilteringChanged =
    JSON.stringify(filteringState) !== JSON.stringify(initialFilteringState) &&
    JSON.stringify(filteringState) !== JSON.stringify(OnlyFilteringClosedState);

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
                filteringState={filteringState}
                setFilteringState={setFilteringState}
                closePopup={() => popupDispatch({ type: "closePopup" })}
              />
            )}
            <FilterSearchBox>
              <img src={searchIcon} alt="serch icon" />
              <input placeholder={`is: issue ${filterString}`} />
            </FilterSearchBox>
          </FilterBar>
          <ButtonsWrapper>
            <LabelMilestoneTap />
            <IssueCreationButton to="/issue">+ 이슈 작성</IssueCreationButton>
          </ButtonsWrapper>
        </TapAndFilterWrapper>
        {isFilteringChanged && (
          <FilterResetButton
            onClick={() => setFilteringState(initialFilteringState)}
          >
            X 현재의 검색 필터 및 정렬 지우기
          </FilterResetButton>
        )}
        <IssueTableHeader
          filteringState={filteringState}
          setFilteringState={setFilteringState}
          issueList={issueList}
          handleOpenPopup={handleOpenPopup}
          handleClosePopup={() => popupDispatch({ type: "closePopup" })}
          popupState={popupState}
          handleFilterInTableHeader={handleFilterInTableHeader}
          selectedIssue={selectedIssue}
          openOrCloseIssues={openOrCloseIssues}
          handleCheckAllIssues={handleCheckAllIssues}
        />
        {filteringState.isOpen && (
          <TableItems
            items={open_Issues}
            handleCheckIssue={handleCheckIssue}
            selectedIssue={selectedIssue}
          />
        )}
        {!filteringState.isOpen && (
          <TableItems
            items={close_Issues}
            handleCheckIssue={handleCheckIssue}
            selectedIssue={selectedIssue}
          />
        )}
        {isIssueListLoading && <p>loading...</p>}
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

const FilterResetButton = styled.div`
  color: rgba(78, 75, 102, 1);
  font-size: 12px;
  margin-top: 25px;
  margin-left: 5px;
  cursor: pointer;
`;
