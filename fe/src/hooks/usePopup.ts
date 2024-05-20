import { useReducer } from "react";

type PopupType =
  | "assignee"
  | "label"
  | "milestone"
  | "reporter"
  | "filter"
  | "issueStatus";

type ActionType =
  | { type: "openPopup"; popup: PopupType }
  | { type: "closePopup" };

interface PopupState {
  assignee: boolean;
  label: boolean;
  milestone: boolean;
  reporter: boolean;
  filter: boolean;
  issueStatus: boolean;
}

const initialPopupState: PopupState = {
  assignee: false,
  label: false,
  milestone: false,
  reporter: false,
  filter: false,
  issueStatus: false,
};

const popupReducer = (state: PopupState, action: ActionType): PopupState => {
  switch (action.type) {
    case "openPopup":
      return { ...state, [action.popup]: true };
    case "closePopup":
      return initialPopupState;
    default:
      return state;
  }
};

const usePopup = () => {
  const [popupState, dispatch] = useReducer(popupReducer, initialPopupState);
  return { popupState, dispatch };
};

export default usePopup;
