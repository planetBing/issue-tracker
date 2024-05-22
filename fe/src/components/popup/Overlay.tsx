import { styled } from "styled-components";
import { PopupState } from "../../hooks/usePopup";

interface OverlayProps {
  popupState: PopupState;
  closePopup: () => void;
}

export default function Overlay({ popupState, closePopup }: OverlayProps) {
  const isOverlayVisible = Object.values(popupState).some((value) => value);
  return <>{isOverlayVisible && <OverlayDiv onClick={() => closePopup()} />}</>;
}

const OverlayDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;
