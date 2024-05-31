import { styled } from "styled-components";
import IconRefresh from "../assets/IconsRefresh.svg";
import * as CommonS from "../styles/common";
import { LabelForm } from "../Model/types";

interface LabelFormProps {
  labelObj: LabelForm;
  inputHandler: {
    handleInputLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRandomBackgroundColor: () => void;
    handleTextColorChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  handleCancel: () => void;
  handleSubmit: () => Promise<void>;
  isCreation: boolean;
}

export default function LabelFormBox({
  labelObj,
  inputHandler,
  handleCancel,
  handleSubmit,
  isCreation,
}: LabelFormProps) {
  const { background_color, text_color, name } = labelObj;
  return (
    <LabelCreationContainer iscreation={isCreation.toString()}>
      {isCreation ? <h3>새로운 레이블 추가</h3> : <h3>레이블 편집</h3>}
      <CreateLabelInfoArea>
        <LabelDesignShowBox>
          <LabelDiv $backgroundColor={background_color} $textColor={text_color}>
            {name === "" ? "Label" : name}
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
              value={labelObj.name ? labelObj.name : ""}
              onChange={inputHandler.handleInputLabel}
            />
          </InputContainer>
          <InputContainer $width={"100%"}>
            <LabelBox>
              <label>설명(선택)</label>
            </LabelBox>
            <input
              name="description"
              placeholder="레이블에 대한 설명을 입력하세요"
              value={labelObj.description ? labelObj.description : ""}
              onChange={inputHandler.handleInputLabel}
            />
          </InputContainer>
          <ColorPickerBox>
            <InputContainer $width={"240px"}>
              <LabelBox>
                <label>배경 색상</label>
              </LabelBox>
              <input type="text" value={background_color} readOnly />
              <img
                src={IconRefresh}
                alt="refresh"
                onClick={inputHandler.handleRandomBackgroundColor}
              />
            </InputContainer>
            <TextColorPicker onChange={inputHandler.handleTextColorChange}>
              <option value="white">밝은색</option>
              <option value="#6e7191">어두운 색</option>
            </TextColorPicker>
          </ColorPickerBox>
        </CreateLabelTextArea>
      </CreateLabelInfoArea>
      <ButtonArea>
        <CancelButton onClick={handleCancel}>X 취소</CancelButton>
        <DoneButton onClick={handleSubmit}>+ 완료</DoneButton>
      </ButtonArea>
    </LabelCreationContainer>
  );
}

const LabelCreationContainer = styled.section<{ iscreation: string }>`
  width: 100%;
  height: 337px;
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

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
