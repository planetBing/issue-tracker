interface Reporter {
  name: string;
  image_path: string;
}

interface Label {
  name: string;
  background_color: string;
  text_color: string;
  description: string | null;
}

interface Milestone {
  id: number;
  name: string;
  description: string;
  end_date: string;
  is_open: boolean;
  open_issue: number;
  close_issue: number;
}

export interface Issue {
  id: number;
  title: string;
  create_At: string;
  reporter: Reporter;
  label: Label | null;
  milestone: Milestone | null;
}

export interface IssueData {
  close_Issues: Issue[];
  open_Issues: Issue[];
}

export const issue = {
  issue_list: [
    {
      id: 1, //이슈 번호
      title: "이슈 제목",
      create_at: "3분 전",
      reporter: {
        name: "gromit",
        image_path:
          "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZkxJBoErs0wbmHXfgooiq-LNRQcynglGGQzQW2rTWUwXM9DBdAmxC049cHzDNA4ayB6s93~ttCJAG3e06Gj6hksfDSJEiqAmVOIg7qB6ms8Vvi1XSyEqBD~DBbDh-KKR5aZt~GbcDG6Eq4MMqy2hhBdFIcIECswVg2zmtCcb6W1bqiJzwtDboW0ksCKcsbZNdBwfPvwMVr2tD0h3sYdLpgCeiK0OorIG4n6xdooMKTXaPXgGXo~n5did7P5-xeya-x~TdGUhXl41T0SLGsk96B~HfoCClasWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
      },
      label: {
        name: "fix",
        background_color: "red",
        text_color: "black",
        description: null,
      },

      milestone: {
        id: 1,
        name: "이슈트래커 마일스톤",
        description: "이슈트래커 마일스톤입니다.",
        end_date: "2024-05-09",
        is_open: true,
        open_issue: 3,
        close_issue: 7,
      },
    },
    {
      id: 2, //이슈 번호
      title: "이슈제목입니다",
      create_at: "5시간 전",
      reporter: {
        name: "Saturn",
        image_path:
          "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZkxJBoErs0wbmHXfgooiq-LNRQcynglGGQzQW2rTWUwXM9DBdAmxC049cHzDNA4ayB6s93~ttCJAG3e06Gj6hksfDSJEiqAmVOIg7qB6ms8Vvi1XSyEqBD~DBbDh-KKR5aZt~GbcDG6Eq4MMqy2hhBdFIcIECswVg2zmtCcb6W1bqiJzwtDboW0ksCKcsbZNdBwfPvwMVr2tD0h3sYdLpgCeiK0OorIG4n6xdooMKTXaPXgGXo~n5did7P5-xeya-x~TdGUhXl41T0SLGsk96B~HfoCClasWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
      },
      label: {
        name: "document",
        background_color: "blue",
        text_color: "white",
        description: null,
      },

      milestone: {
        id: 1,
        name: "이슈트래커 마일스톤",
        description: "이슈트래커 마일스톤입니다.",
        end_date: "2024-05-09",
        is_open: true,
        open_issue: 3,
        close_issue: 7,
      },
    },
    {
      id: 3, //이슈 번호
      title: "이슈 제목",
      create_at: "3분 전",
      reporter: {
        name: "Asher",
        image_path:
          "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZkxJBoErs0wbmHXfgooiq-LNRQcynglGGQzQW2rTWUwXM9DBdAmxC049cHzDNA4ayB6s93~ttCJAG3e06Gj6hksfDSJEiqAmVOIg7qB6ms8Vvi1XSyEqBD~DBbDh-KKR5aZt~GbcDG6Eq4MMqy2hhBdFIcIECswVg2zmtCcb6W1bqiJzwtDboW0ksCKcsbZNdBwfPvwMVr2tD0h3sYdLpgCeiK0OorIG4n6xdooMKTXaPXgGXo~n5did7P5-xeya-x~TdGUhXl41T0SLGsk96B~HfoCClasWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
      },
      label: {
        name: "fix",
        background_color: "red",
        text_color: "black",
        description: null,
      },

      milestone: {
        id: 1,
        name: "이슈트래커 마일스톤",
        description: "이슈트래커 마일스톤입니다.",
        end_date: "2024-05-09",
        is_open: true,
        open_issue: 3,
        close_issue: 7,
      },
    },
    {
      id: 4, //이슈 번호
      title: "마음대로 이슈제목",
      create_at: "3분 전",
      reporter: {
        name: "Day",
        image_path:
          "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZkxJBoErs0wbmHXfgooiq-LNRQcynglGGQzQW2rTWUwXM9DBdAmxC049cHzDNA4ayB6s93~ttCJAG3e06Gj6hksfDSJEiqAmVOIg7qB6ms8Vvi1XSyEqBD~DBbDh-KKR5aZt~GbcDG6Eq4MMqy2hhBdFIcIECswVg2zmtCcb6W1bqiJzwtDboW0ksCKcsbZNdBwfPvwMVr2tD0h3sYdLpgCeiK0OorIG4n6xdooMKTXaPXgGXo~n5did7P5-xeya-x~TdGUhXl41T0SLGsk96B~HfoCClasWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
      },
      label: {
        name: "fix",
        background_color: "red",
        text_color: "black",
        description: null,
      },

      milestone: {
        id: 1,
        name: "이슈트래커 마일스톤",
        description: "이슈트래커 마일스톤입니다.",
        end_date: "2024-05-09",
        is_open: true,
        open_issue: 3,
        close_issue: 7,
      },
    },
  ],

  total_open_issue: 3,
  total_close_issue: 7,
};
