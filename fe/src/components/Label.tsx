import { styled } from "styled-components";
import { Label } from "../Model/types";

interface LabelProps {
  labelInfo?: Label;
}

export default function LabelComponent({ labelInfo }: LabelProps) {
  if (!labelInfo) {
    return null;
  }

  const { background_color, text_color, name } = labelInfo;
  return (
    <LabelDiv $backgroundColor={background_color} $textColor={text_color}>
      {name}
    </LabelDiv>
  );
}

const LabelDiv = styled.div<{ $backgroundColor: string; $textColor: string }>`
  padding: 4px 8px;
  border-radius: 16px;
  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
`;
