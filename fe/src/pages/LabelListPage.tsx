import { useState } from "react";
import { styled } from "styled-components";
import PageHeader from "../components/PageHeader";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import * as CommonS from "../styles/common";
import useApi from "../hooks/api/useApi";
import LabelMilestoneTap from "../components/LabelMilestoneTap";
import { Label } from "../Model/types";
import LabelComponent from "../components/Label";
import greyEditIcon from "../assets/greyEdit.svg";
import trashIcon from "../assets/trash.svg";
import IconRefresh from "../assets/IconsRefresh.svg";

interface LabelForm {
  name: string;
  background_color: string;
  text_color: string;
  description: null | string;
}

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
  } = useApi<Label[]>("/label");
  const [isShowLabelCreation, setIsShowLabelCreation] =
    useState<boolean>(false);
  const [labelCreation, setLabelCreation] =
    useState<LabelForm>(initialLabelForm);

  const handleInputLabel = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLabelCreation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRandomBackgroundColor = () => {
    setLabelCreation((prev) => ({
      ...prev,
      background_color: getRandomHexColor(),
    }));
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLabelCreation((prev) => ({
      ...prev,
      text_color: value,
    }));
  };

  const handleAddLabel = async () => {
    await postNewLabel("/label", labelCreation);
    setIsShowLabelCreation(false);
    refetchLabelList();
  };

  const handleDeleteLabel = async (labelId: number) => {
    await deleteLabel(`/label/${labelId.toString()}`);
    refetchLabelList();
  };

  return (
    <>
      <PageHeader loggedInUserImageSrc={currentUser?.image_path} />
      <CommonS.Wrapper>
        <LabelPageHeader>
          <LabelMilestoneTap />
          <AddLabelBtn onClick={() => setIsShowLabelCreation(true)}>
            + 레이블 추가
          </AddLabelBtn>
        </LabelPageHeader>
        {isShowLabelCreation && (
          <LabelCreationContainer>
            <h3>새로운 레이블 추가</h3>
            <CreateLabelInfoArea>
              <LabelDesignShowBox>
                <LabelDiv
                  $backgroundColor={labelCreation.background_color}
                  $textColor={labelCreation.text_color}
                >
                  {labelCreation.name === "" ? "Label" : labelCreation.name}
                </LabelDiv>
              </LabelDesignShowBox>
              <CreateLabelTextArea>
                <InputContainer $width={"100%"}>
                  <LabelBox>
                    <label>이름</label>
                  </LabelBox>
                  <input
                    name="name"
                    placeholder="레이블의 이름을 입력하세요"
                    onChange={handleInputLabel}
                  />
                </InputContainer>
                <InputContainer $width={"100%"}>
                  <LabelBox>
                    <label>설명(선택)</label>
                  </LabelBox>
                  <input
                    name="description"
                    placeholder="레이블에 대한 설명을 입력하세요"
                    onChange={handleInputLabel}
                  />
                </InputContainer>
                <ColorPickerBox>
                  <InputContainer $width={"240px"}>
                    <LabelBox>
                      <label>배경 색상</label>
                    </LabelBox>
                    <input
                      type="text"
                      value={labelCreation.background_color}
                      readOnly
                    />
                    <img
                      src={IconRefresh}
                      alt="refresh"
                      onClick={handleRandomBackgroundColor}
                    />
                  </InputContainer>
                  <TextColorPicker onChange={handleTextColorChange}>
                    <option value="white">밝은색</option>
                    <option value="#6e7191">어두운 색</option>
                  </TextColorPicker>
                </ColorPickerBox>
              </CreateLabelTextArea>
            </CreateLabelInfoArea>
            <CreateLabelButtonArea>
              <CreateCancelButton onClick={() => setIsShowLabelCreation(false)}>
                X 취소
              </CreateCancelButton>
              <CreateDoneButton onClick={handleAddLabel}>
                + 완료
              </CreateDoneButton>
            </CreateLabelButtonArea>
          </LabelCreationContainer>
        )}
        <IssueTableTop>
          <LabelNum>{labeListData?.length}개의 레이블</LabelNum>
        </IssueTableTop>
        {isLabelDataLoading && <p>...loading</p>}
        {labeListData?.map((labelObj) => {
          const { id, description } = labelObj;
          return (
            <IssueTable key={`labelList-${id}`}>
              <LabelInfo>
                <LabelArea>
                  <LabelComponent labelInfo={labelObj}></LabelComponent>
                </LabelArea>
                <p>{description}</p>
              </LabelInfo>
              <TableButtonArea>
                <LabelEditButton>
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
`;

const LabelCreationContainer = styled.section`
  width: 100%;
  height: 337px;
  background-color: white;
  margin-top: 25px;
  border-radius: 16px;
  padding: 32px;

  & h3 {
    margin-top: 0;
    font-size: 20px;
  }
`;

const CreateLabelInfoArea = styled(CommonS.SpaceBetween)`
  width: 100%;
  height: 153px;
  margin-bottom: 25px;
`;

const LabelDesignShowBox = styled(CommonS.Center)`
  width: 288px;
  height: 100%;
  border: 1px solid rgba(217, 219, 233, 1);
  border-radius: 11px;
`;

const LabelDiv = styled.div<{ $backgroundColor: string; $textColor: string }>`
  padding: 4px 16px;
  border-radius: 16px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  height: 28.5px;
`;

const CreateLabelTextArea = styled(CommonS.ColumnFlex)`
  width: 904px;
  height: 153px;
  justify-content: space-between;
`;

const CreateLabelButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CreateCancelButton = styled.button`
  width: 128px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(0, 122, 255, 1);
  background-color: white;
  color: rgba(0, 122, 255, 1);
  margin-right: 15px;
`;

const CreateDoneButton = styled.button`
  background-color: rgba(0, 122, 255, 1);
  border: none;
  color: white;
  width: 128px;
  height: 40px;
  border-radius: 12px;
`;

const InputContainer = styled.div<{ $width: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.$width};
  height: 40px;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 12px;
  padding: 0 15px;

  & label {
    color: rgba(110, 113, 145, 1);
    font-size: 12px;
  }

  & input {
    border: none;
    background-color: transparent;
    width: 100%;
  }
`;

const LabelBox = styled.div`
  width: 64px;
  display: flex;
`;

const ColorPickerBox = styled.div`
  display: flex;
  gap: 10px;
`;

const TextColorPicker = styled.select`
  border: none;
`;
