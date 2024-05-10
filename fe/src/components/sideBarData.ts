interface Label {
  name: string;
  backgroundColor: string;
  textColor: string;
}

interface Milestone {
  title: string;
  description: string | null;
  end_date: string;
  is_open: boolean;
  progress: number;
  open_issue: number;
  close_issue: number;
}

export const label: Label[] = [
  { name: "fix", backgroundColor: "blue", textColor: "white" },
  { name: "error", backgroundColor: "red", textColor: "black" },
  { name: "bingsoo", backgroundColor: "yellow", textColor: "black" },
];

export const milestone: Milestone[] = [
  {
    title: "이슈트래커 마일스톤",
    description: "빙수~ 너무 귀여워",
    end_date: "2024-05-09",
    is_open: true,
    progress: 70,
    open_issue: 3,
    close_issue: 7,
  },
  {
    title: "스프링부트 마일스톤",
    description: null,
    end_date: "2024-05-09",
    is_open: true,
    progress: 70,
    open_issue: 3,
    close_issue: 7,
  },
];
