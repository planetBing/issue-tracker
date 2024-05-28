import { styled } from "styled-components";
import paperclipSvg from "../assets/paperclip.svg";

interface CommentAreaProps {
  handleInputComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  comment: string | null;
  height: string;
}

export default function CommentWriteArea({
  handleInputComment,
  comment,
  height,
}: CommentAreaProps) {
  return (
    <>
      <TextAreaWrapper>
        <StyledTextArea
          name="comment"
          placeholder="코멘트를 입력하세요"
          onChange={handleInputComment}
          $height={height}
        ></StyledTextArea>
        {comment && <CharCount>띄어쓰기 포함 {comment?.length}자</CharCount>}
      </TextAreaWrapper>
      <FileAttach>
        <label htmlFor="file">
          <FileAttachBtn>
            <img src={paperclipSvg} alt="paperclip" />
            <div>파일 첨부하기</div>
          </FileAttachBtn>
        </label>
        <input type="file" id="file" />
      </FileAttach>
    </>
  );
}
const TextAreaWrapper = styled.div`
  position: relative;
  margin-bottom: -3px;
`;

const StyledTextArea = styled.textarea<{ $height: string }>`
  height: ${({ $height }) => $height};
  border: none;
  padding: 16px;
  background-color: rgba(239, 240, 246, 1);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: 1px dashed rgba(217, 219, 233, 1);
  width: 100%;

  &:focus {
    outline-color: black;
    background-color: white;
  }
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: gray;
  margin-top: 4px;
  position: absolute;
  width: 100%;
  top: 310px;
  padding-right: 25px;
`;

const FileAttach = styled.div`
  display: flex;
  align-items: center;
  height: 52px;
  border: none;
  padding: 0 16px;
  background-color: rgba(239, 240, 246, 1);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;

  & input {
    display: none;
  }
`;

const FileAttachBtn = styled.div`
  display: flex;
  cursor: pointer;

  & div {
    margin-left: 4px;
    font-size: 12px;
    font-weight: 500;
    color: rgba(78, 75, 102, 1);
    line-height: 16px;
  }
`;
