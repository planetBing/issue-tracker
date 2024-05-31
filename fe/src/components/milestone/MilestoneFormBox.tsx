import { styled } from "styled-components";
import * as CommonS from "../../styles/common";
import { MilestoneForm } from "../../type/types";

interface MilestoneFormProps {
  milestoneForm: MilestoneForm;
  handleCancel: () => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  isCreation: boolean;
}

export default function MilestoneFormBox({
  milestoneForm,
  handleCancel,
  handleInput,
  handleSubmit,
  isCreation,
}: MilestoneFormProps) {
  return (
    <LabelCreationContainer iscreation={isCreation.toString()}>
      {isCreation ? <h3>새로운 마일스톤 추가</h3> : <h3>마일스톤 편집</h3>}
      <NameAndEndDateArea>
        <InputContainer $width={"600px"}>
          <label>이름</label>
          <input
            name="name"
            placeholder="마일스톤의 이름을 입력하세요"
            value={milestoneForm.name}
            onChange={handleInput}
          />
        </InputContainer>
        <InputContainer $width={"600px"}>
          <label>완료일(선택)</label>
          <input
            name="end_date"
            placeholder="YYYY-MM-DD"
            value={milestoneForm.end_date}
            onChange={handleInput}
          />
        </InputContainer>
      </NameAndEndDateArea>
      <InputContainer $width={"100%"} onChange={handleInput}>
        <label>설명(선택)</label>
        <input
          name="description"
          placeholder="마일스톤에 대한 설명을 입력하세요"
          value={milestoneForm.description ? milestoneForm.description : ""}
          onChange={handleInput}
        />
      </InputContainer>
      <ButtonArea>
        <CancelButton onClick={handleCancel}>X 취소</CancelButton>
        <DoneButton onClick={handleSubmit}>+ 완료</DoneButton>
      </ButtonArea>
    </LabelCreationContainer>
  );
}

const LabelCreationContainer = styled.section<{ iscreation: string }>`
  width: 100%;
  height: 284px;
  background-color: white;
  margin-top: ${({ iscreation }) => (iscreation === "true" ? "25px" : "0")};
  border-radius: ${({ iscreation }) => (iscreation === "true" ? "26px" : "0")};
  padding: 32px;
  border-bottom: ${({ iscreation }) =>
    iscreation === "true" ? "none" : "1px solid rgb(218, 219, 233)"};
  border-left: ${({ iscreation }) =>
    iscreation === "true" ? "none" : "1px solid rgb(218, 219, 233)"};
  border-right: ${({ iscreation }) =>
    iscreation === "true" ? "none" : "1px solid rgb(218, 219, 233)"};
  & h3 {
    margin-top: 0;
    font-size: 20px;
  }
`;

const InputContainer = styled.div<{ $width: string }>`
  display: flex;
  align-items: center;
  width: ${(props) => props.$width};
  height: 40px;
  background-color: rgba(239, 240, 246, 1);
  border-radius: 12px;
  padding: 0 15px;
  margin-bottom: 16px;

  & label {
    color: rgba(110, 113, 145, 1);
    font-size: 12px;
    width: 75px;
  }

  & input {
    border: none;
    background-color: transparent;
    width: 100%;
  }
`;

const NameAndEndDateArea = styled(CommonS.SpaceBetween)``;

const CancelButton = styled.button`
  width: 128px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(0, 122, 255, 1);
  background-color: white;
  color: rgba(0, 122, 255, 1);
  margin-right: 15px;
`;

const DoneButton = styled.button`
  background-color: rgba(0, 122, 255, 1);
  border: none;
  color: white;
  width: 128px;
  height: 40px;
  border-radius: 12px;
`;

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;
