import { styled } from "styled-components";

export const DropdownPanel = styled.div`
  position: absolute;
  width: 240px;
  min-height: 67.5px;
  max-height: 211.5px;
  border-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  overflow: hidden;
  z-index: 1100;
`;

export const DropdownHeader = styled.div`
  padding: 8px 16px;
  background-color: rgba(247, 247, 252, 1);
  color: rgba(110, 113, 145, 1);
  font-weight: 500;
  font-size: 12px;
`;

export const DropdownOption = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(217, 219, 233, 1);

  &:last-child {
    border-bottom: none;
  }
`;

export const OptionInfo = styled.div`
  display: flex;

  & span {
    font-weight: 500;
    font-size: 16px;
    color: rgba(78, 75, 102, 1);
  }
`;
