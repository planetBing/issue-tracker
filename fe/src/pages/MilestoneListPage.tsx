import { styled } from "styled-components";
import PageHeader from "../components/general/PageHeader";
import useApi from "../hooks/api/useApi";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import * as S from "../styles/tableItems";
import LabelMilestoneTap from "../components/general/LabelMilestoneTap";
import MilestoneFormBox from "../components/milestone/MilestoneFormBox";
import { Milestone, MilestoneForm } from "../type/types";
import alertIcon from "../assets/alertCircle.svg";
import archiveIcon from "../assets/archive.svg";

import { useState } from "react";
import MilestoneTableItems from "../components/milestone/MilestoneTableItems";

const initialMilestoneForm = {
  name: "",
  description: "",
  end_date: "",
};

export default function MilestoneListPage() {
  const { currentUser } = useCurrentUser();
  const {
    data: milestoneListData,
    postData: addNewMilestone,
    refetch: refetchMilestoneList,
    deleteData: deleteMilestone,
    putData: updateMilestone,
    patchData,
  } = useApi<Milestone[]>("/milestone");
  const [isOpenMode, setIsOpenMode] = useState<boolean>(true);
  const [isCreationMode, setIsCreationMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [milestoneForm, setMilestoneForm] =
    useState<MilestoneForm>(initialMilestoneForm);
  const [editMilestoneId, setEditMilestoneId] = useState<number | null>(null);

  const openMilestones = milestoneListData?.filter(
    (milestone) => milestone.is_open
  );
  const closedMilestones = milestoneListData?.filter(
    (milestone) => !milestone.is_open
  );

  const handleCancel = () => {
    setIsCreationMode(false);
    setIsEditMode(false);
    setMilestoneForm(initialMilestoneForm);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMilestoneForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isEditMode && editMilestoneId !== null) {
      await updateMilestone(
        `/milestone/${editMilestoneId.toString()}`,
        milestoneForm
      );
    } else {
      await addNewMilestone("/milestone", milestoneForm);
    }
    setIsCreationMode(false);
    setIsEditMode(false);
    setEditMilestoneId(null);
    setMilestoneForm(initialMilestoneForm);
    refetchMilestoneList();
  };

  const handleDeleteMilestone = async (milestoneId: number) => {
    await deleteMilestone(`/milestone/${milestoneId.toString()}`);
    refetchMilestoneList();
  };

  const handleEditMode = (
    milestoneId: number,
    name: string,
    description: string | null,
    end_date: string
  ) => {
    const editMilestoneForm = { name, description, end_date };
    setEditMilestoneId(milestoneId);
    setIsEditMode(true);
    setMilestoneForm(editMilestoneForm);
  };

  const openOrCloseMilestone = async (is_open: boolean, id: number) => {
    const patchPath = is_open ? "/milestone/close" : "/milestone/open";
    await patchData(`${patchPath}/${id}`);
    refetchMilestoneList();
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <S.LabelPageHeader>
          <LabelMilestoneTap />
          <S.AddLabelBtn onClick={() => setIsCreationMode(true)}>
            + 마일스톤 추가
          </S.AddLabelBtn>
        </S.LabelPageHeader>
        {isCreationMode && (
          <MilestoneFormBox
            milestoneForm={milestoneForm}
            handleCancel={handleCancel}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            isCreation={true}
          />
        )}
        <S.IssueTableTop>
          <OpenIssueTap
            onClick={() => setIsOpenMode(true)}
            isactive={isOpenMode ? "true" : "false"}
          >
            <img src={alertIcon} alt="open icon" />
            <span>열린 마일스톤({openMilestones?.length})</span>
          </OpenIssueTap>
          <ClosedIssueTap
            onClick={() => setIsOpenMode(false)}
            isactive={!isOpenMode ? "true" : "false"}
          >
            <img src={archiveIcon} alt="closed icon" />
            <span>닫힌 마일스톤({closedMilestones?.length})</span>
          </ClosedIssueTap>
        </S.IssueTableTop>
        {isOpenMode &&
          openMilestones?.map((milestoneObj) => {
            const { id } = milestoneObj;
            if (isEditMode && editMilestoneId === id) {
              return (
                <MilestoneFormBox
                  key={`editMiletone-${id}`}
                  milestoneForm={milestoneForm}
                  handleCancel={handleCancel}
                  handleInput={handleInput}
                  handleSubmit={handleSubmit}
                  isCreation={false}
                />
              );
            }
            return (
              <MilestoneTableItems
                key={`milestoneList-${id}`}
                milestoneObj={milestoneObj}
                handleDeleteMilestone={handleDeleteMilestone}
                handleEditMode={handleEditMode}
                openOrCloseMilestone={openOrCloseMilestone}
              />
            );
          })}
        {!isOpenMode &&
          closedMilestones?.map((milestoneObj) => {
            const { id } = milestoneObj;
            return (
              <MilestoneTableItems
                key={`milestoneList-${id}`}
                milestoneObj={milestoneObj}
                handleDeleteMilestone={handleDeleteMilestone}
                handleEditMode={handleEditMode}
                openOrCloseMilestone={openOrCloseMilestone}
              />
            );
          })}
      </CommonS.Wrapper>
    </>
  );
}

const OpenIssueTap = styled.div<{ isactive: string }>`
  display: flex;
  margin-right: 24px;
  font-weight: ${({ isactive }) => (isactive === "true" ? 700 : 500)};
  font-size: 16px;
  color: ${({ isactive }) =>
    isactive === "true" ? "rgba(20, 20, 43, 1)" : "rgba(78, 75, 102, 1)"};
  cursor: pointer;
  img {
    margin-right: 4px;
  }
`;

const ClosedIssueTap = styled.div<{ isactive: string }>`
  display: flex;
  font-weight: ${({ isactive }) => (isactive === "true" ? 700 : 500)};
  font-size: 16px;
  color: ${({ isactive }) =>
    isactive === "true" ? "rgba(20, 20, 43, 1)" : "rgba(78, 75, 102, 1)"};
  cursor: pointer;
  img {
    margin-right: 4px;
  }
`;
