export interface User {
  name: string;
  image_path: string;
}

export interface Label {
  name: string;
  backgroundColor: string;
  textColor: string;
}

export interface Milestone {
  id: number;
  title: string;
  description: string | null;
  end_date: string;
  is_open: boolean;
  progress: number;
  open_issue: number;
  close_issue: number;
}
