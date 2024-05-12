interface Label {
  name: string;
  backgroundColor: string;
  textColor: string;
}

interface Milestone {
  id: number;
  title: string;
  description: string | null;
  end_date: string;
  is_open: boolean;
  progress: number;
  open_issue: number;
  close_issue: number;
}

interface Assignee {
  user_id: string;
  user_name: string;
  image_path: string;
}

export const label: Label[] = [
  { name: "fix", backgroundColor: "blue", textColor: "white" },
  { name: "error", backgroundColor: "red", textColor: "black" },
  { name: "bingsoo", backgroundColor: "yellow", textColor: "black" },
];

export const milestone: Milestone[] = [
  {
    id: 1243567654,
    title: "이슈트래커 마일스톤",
    description: "빙수~ 너무 귀여워",
    end_date: "2024-05-09",
    is_open: true,
    progress: 70,
    open_issue: 3,
    close_issue: 7,
  },
  {
    id: 238579,
    title: "스프링부트 마일스톤",
    description: null,
    end_date: "2024-05-09",
    is_open: true,
    progress: 70,
    open_issue: 3,
    close_issue: 7,
  },
];

export const assignee: Assignee[] = [
  {
    user_id: "pobi",
    user_name: "포비",
    image_path:
      "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=17[…]sWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
  },
  {
    user_id: "crong",
    user_name: "크롱",
    image_path:
      "https://s3-alpha-sig.figma.com/img/e106/34bc/d689ae0b2e26bdc0af670267e917ec2d?Expires=17[…]eADEzyF3LWtT96zliRjejMOBFaEw~NN1MJ8RZLvKJ0L2nIY-3fYSOiw__",
  },
];
