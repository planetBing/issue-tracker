import { styled } from "styled-components";
import * as CommonS from "./common";

export const LabelPageHeader = styled(CommonS.SpaceBetween)`
  height: 40px;
`;

export const AddLabelBtn = styled.button`
  background-color: rgba(0, 122, 255, 1);
  color: white;
  font-size: 12px;
  border: none;
  padding: 0 16px;
  height: 100%;
  width: 128px;
  border-radius: 12px;
`;

export const IssueTableTop = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 1px solid rgba(217, 219, 233, 1);
  margin-top: 25px;
  padding: 0 32px;
`;

export const IssueTable = styled.div`
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

export const LabelEditButton = styled(CommonS.Center)`
  cursor: pointer;
  color: rgba(78, 75, 102, 1);
  font-size: 12px;
  img {
    margin-right: 5px;
  }
`;

export const LabelDeleteButton = styled(CommonS.Center)`
  color: rgba(255, 59, 48, 1);
  font-size: 12px;
  cursor: pointer;
`;
