import { useState } from "react";
import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import useApi from "../hooks/api/useApi";
import LabelMilestoneTap from "../components/LabelMilestoneTap";
import { Label, LabelForm } from "../Model/types";
import LabelComponent from "../components/Label";
import greyEditIcon from "../assets/greyEdit.svg";
import trashIcon from "../assets/trash.svg";
import LabelFormBox from "../components/LabelForm";

const initialLabelForm = {
  name: "",
  background_color: getRandomHexColor(),
  text_color: "white",
  description: null,
};

function getRandomHexColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function LabelListPage() {
  const { currentUser } = useCurrentUser();
  const {
    data: labeListData,
    isLoading: isLabelDataLoading,
    refetch: refetchLabelList,
    postData: postNewLabel,
    deleteData: deleteLabel,
    putData: updateLabel,
  } = useApi<Label[]>("/label");
  const [isCreationMode, setIsCreationMode] = useState<boolean>(false);
  const [labelForm, setLabelForm] = useState<LabelForm>(initialLabelForm);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editLabelId, setEditLabelId] = useState<number | null>(null);

  const inputHandlers = {
    handleInputLabel: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setLabelForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    handleRandomBackgroundColor: () => {
      setLabelForm((prev) => ({
        ...prev,
        background_color: getRandomHexColor(),
      }));
    },
    handleTextColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      setLabelForm((prev) => ({
        ...prev,
        text_color: value,
      }));
    },
  };

  // const handleAddLabel = async () => {
  //   await postNewLabel("/label", labelForm);
  //   setIsCreationMode(false);
  //   refetchLabelList();
  // };

  const handleDeleteLabel = async (labelId: number) => {
    await deleteLabel(`/label/${labelId.toString()}`);
    refetchLabelList();
  };

  const handleEditLabel = (label: Label) => {
    const { id, ...labelWithoutId } = label;
    setLabelForm(labelWithoutId);
    setIsEditMode(true);
    setEditLabelId(label.id);
  };

  const handleCancel = () => {
    setIsCreationMode(false);
    setIsEditMode(false);
    setEditLabelId(null);
    setLabelForm(initialLabelForm);
  };

  const handleSubmit = async () => {
    if (isEditMode && editLabelId !== null) {
      const labelFormWithId = { ...labelForm, id: editLabelId };
      await updateLabel(`/label`, labelFormWithId);
    } else {
      await postNewLabel("/label", labelForm);
    }
    setIsCreationMode(false);
    setIsEditMode(false);
    setEditLabelId(null);
    setLabelForm(initialLabelForm);
    refetchLabelList();
  };
  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <LabelPageHeader>
          <LabelMilestoneTap />
          <AddLabelBtn onClick={() => setIsCreationMode(true)}>
            + 레이블 추가
          </AddLabelBtn>
        </LabelPageHeader>
        {isCreationMode && (
          <LabelFormBox
            labelObj={labelForm}
            inputHandler={inputHandlers}
            handleCancel={() => setIsCreationMode(false)}
            handleSubmit={handleSubmit}
          />
        )}
        <IssueTableTop>
          <LabelNum>{labeListData?.length}개의 레이블</LabelNum>
        </IssueTableTop>
        {isLabelDataLoading && <p>...loading</p>}
        {labeListData?.map((labelObj) => {
          const { id, description } = labelObj;
          if (isEditMode && editLabelId === id) {
            return (
              <LabelFormBox
                key={`editLabel-${id}`}
                labelObj={labelForm}
                inputHandler={inputHandlers}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
              />
            );
          }
          return (
            <IssueTable key={`labelList-${id}`}>
              <LabelInfo>
                <LabelArea>
                  <LabelComponent labelInfo={labelObj}></LabelComponent>
                </LabelArea>
                <p>{description}</p>
              </LabelInfo>
              <TableButtonArea>
                <LabelEditButton onClick={() => handleEditLabel(labelObj)}>
                  <img src={greyEditIcon} alt="edit icon" />
                  편집
                </LabelEditButton>
                <LabelDeleteButton onClick={() => handleDeleteLabel(id)}>
                  <img src={trashIcon} alt="trash icon" />
                  삭제
                </LabelDeleteButton>
              </TableButtonArea>
            </IssueTable>
          );
        })}
      </CommonS.Wrapper>
    </>
  );
}

const LabelPageHeader = styled(CommonS.SpaceBetween)`
  height: 40px;
`;

const AddLabelBtn = styled.button`
  background-color: rgba(0, 122, 255, 1);
  color: white;
  font-size: 12px;
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 128px;
  border-radius: 12px;
`;

const IssueTableTop = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 25px;
  padding: 0 32px;
`;

const LabelNum = styled.span`
  color: rgba(78, 75, 102, 1);
  font-weight: 700;
  font-size: 16px;
`;

const IssueTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 96px;
  background-color: rgba(254, 254, 254, 1);
  padding: 16px 32px;
  border-left: 1px solid rgba(217, 219, 233, 1);
  border-right: 1px solid rgba(217, 219, 233, 1);
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

const LabelArea = styled.div`
  display: flex;
  width: 176px;
`;

const LabelInfo = styled.div`
  display: flex;
  align-items: center;

  & p {
    color: rgba(110, 113, 145, 1);
    font-size: 16px;
  }
`;

const TableButtonArea = styled.div`
  display: flex;
  gap: 24px;
`;

const LabelEditButton = styled(CommonS.Center)`
  color: rgba(78, 75, 102, 1);
  font-size: 12px;
`;

const LabelDeleteButton = styled(CommonS.Center)`
  color: rgba(255, 59, 48, 1);
  font-size: 12px;
  cursor: pointer;
`;
