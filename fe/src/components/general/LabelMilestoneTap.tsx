import { styled } from "styled-components";
import labelIcon from "../../assets/label.svg";
import milestoneIcon from "../../assets/milestone.svg";
import useApi from "../../hooks/api/useApi";
import { Label, Milestone } from "../../type/types";
import { Link } from "react-router-dom";

export default function LabelMilestoneTap() {
  const { data: labelListData } = useApi<Label[]>("/label");
  const { data: milestoneListData } = useApi<Milestone[]>("/milestone");
  return (
    <TapBox>
      <TapButton>
        <img src={labelIcon} alt="label icon" />
        <StyledLink to="/label">레이블({labelListData?.length})</StyledLink>
      </TapButton>
      <TapButton>
        <img src={milestoneIcon} alt="milestone icon" />
        <StyledLink to="/milestone">
          마일스톤({milestoneListData?.length})
        </StyledLink>
      </TapButton>
    </TapBox>
  );
}

const TapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100%;
  border: 1px solid rgba(217, 219, 233, 1);
  border-radius: 12px;
  overflow: hidden;
`;

const TapButton = styled.div`
  width: 159.5px;
  height: 100%;
  background-color: rgba(247, 247, 252, 1);
  font-size: 16px;
  border-right: 1px solid rgba(217, 219, 233, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:last-child {
    border: none;
  }

  img {
    margin-right: 4px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(78, 75, 102, 1);
`;
