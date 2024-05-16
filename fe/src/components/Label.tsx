import { styled } from "styled-components";

interface LabelProps {
  labelInfo: Label;
}

interface Label {
  name: string;
  background_color: string;
  text_color: string;
  description: string | null;
}

export default function LabelComponent({ labelInfo }: LabelProps) {
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
