import { User, Label, Milestone } from "../Model/types";

export const label: Label[] = [
  {
    id: 1,
    name: "fix",
    background_color: "blue",
    text_color: "white",
    description: "fix입니다.",
  },
  {
    id: 2,
    name: "error",
    background_color: "red",
    text_color: "black",
    description: "error입니다.",
  },
  {
    id: 3,
    name: "bingsoo",
    background_color: "yellow",
    text_color: "black",
    description: "bingsoo입니다.",
  },
];

export const milestone: Milestone[] = [
  {
    id: 1243567654,
    name: "이슈트래커 마일스톤",
    description: "빙수~ 너무 귀여워",
    end_date: "2024-05-09",
    is_open: true,
    open_issue: 3,
    close_issue: 7,
  },
  {
    id: 238579,
    name: "스프링부트 마일스톤",
    description: null,
    end_date: "2024-05-09",
    is_open: true,
    open_issue: 3,
    close_issue: 7,
  },
];

export const userList: User[] = [
  {
    name: "pobi",
    image_path:
      "https://s3-alpha-sig.figma.com/img/b605/5489/13f119578d9ba03050fc4eb0c1bd5681?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZTCempwDrtDahneId5fMg6YCJ8ghsdob-4aokB~Oy6WL6T1h0zYP-eDhMcKh3lmljff9GO7qsLA6KxbjIMjrXHODFyWn40mGeIeK~6wbsZUDfSa~jtaKUaUAyMjs2zYYhn4rhlwBJ0Myw4wKOJtxGotLqkrx7aaHRbXenAOPSyDR9ilyw7VXWdxzFBI9-wyEzZbBkthl~mFw~wxg~K~D3oVYN0p~oPowCoj5lWy6XbZw54rjwZDY1cZeVmXjRCsAHFA67meQpQIggaRqf3P00L7LJD3zn9PmhSiVdyvNGSd5DAgD8d~thD6OWKMp6fq7w4b~z463YThAZutda6P41w__",
  },
  {
    name: "crong",
    image_path:
      "https://s3-alpha-sig.figma.com/img/6d55/6a69/312d39e9f8c4ecbe35724caa49257977?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZkxJBoErs0wbmHXfgooiq-LNRQcynglGGQzQW2rTWUwXM9DBdAmxC049cHzDNA4ayB6s93~ttCJAG3e06Gj6hksfDSJEiqAmVOIg7qB6ms8Vvi1XSyEqBD~DBbDh-KKR5aZt~GbcDG6Eq4MMqy2hhBdFIcIECswVg2zmtCcb6W1bqiJzwtDboW0ksCKcsbZNdBwfPvwMVr2tD0h3sYdLpgCeiK0OorIG4n6xdooMKTXaPXgGXo~n5did7P5-xeya-x~TdGUhXl41T0SLGsk96B~HfoCClasWAhG~PLwDvlriqsSkX2MduWPq7yBSO6N66TgMg4WCIRne9m7A8oMqQ__",
  },
];
