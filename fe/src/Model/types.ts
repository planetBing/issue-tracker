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
