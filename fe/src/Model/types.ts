export interface User {
  name: string;
  image_path: string;
}

export interface Label {
  name: string;
  background_color: string;
  text_color: string;
  description: string | null;
}

export interface Milestone {
  id: number;
  name: string;
  description: string | null;
  end_date: string;
  is_open: boolean;
  open_issue: number;
  close_issue: number;
}

export interface Issue {
  id: number;
  title: string;
  create_At: string;
  reporter: User;
  label: Label | null;
  milestone: Milestone | null;
}

export interface IssueData {
  close_Issues: Issue[];
  open_Issues: Issue[];
}

export interface FilteringState {
  isOpen: boolean;
  assignee: string[];
  label: string[];
  milestone: string[];
  reporter: string[];
  comment: string[];
}
