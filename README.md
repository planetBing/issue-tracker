# **이슈 트래커**

<br>

# 🙋‍♂️ **멤버**

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/planetBing">
        <img src="https://avatars.githubusercontent.com/u/150240792?v=4" width="150px;" alt="정채영 프로필 사진"/><br />
        <sub><b>정채영(FE)</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seondays">
        <img src="https://avatars.githubusercontent.com/u/110711591?v=4" width="150px;" alt="김은선 프로필 사진"/><br />
        <sub><b>김은선(BE)</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/jonghyeok-97">
        <img src="https://avatars.githubusercontent.com/u/136168660?v=4" width="150px;" alt="안종혁 프로필 사진"/><br />
        <sub><b>안종혁(BE)</b><br></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dnjsxo0616">
        <img src="https://avatars.githubusercontent.com/u/57781744?v=4" width="150px;" alt="한원태 프로필 사진"/><br />
        <sub><b>한원태(BE)</b><br></sub>
      </a>
    </td>
  </tr>
</table>

<br>

# 📚 **개발 포인트**

<details>
<summary>상태 관리</summary>
<div markdown="1">

- 상태 설계에 대한 기본 생각
  - UI에 필요한 데이터가 생길 때 마다 useState를 이용해 상태로 관리해야하는지 고민했습니다.
  - 그러나, 상태가 많아지고, 상태 간의 관계가 존재하는 경우 서로의 의존성이 올라가고 복잡도가 증가했습니다.
  - A 상태를 이용해 B 상태를 계산할 수 있는 경우, B를 상태가 아닌 A로부터 계산하는 일반 변수로 관리했습니다.
    - 불필요한 상태를 줄여 렌더링 시점도 명확하게 컨트롤하며, 상태가 모순이 생길 일도 없어졌습니다.
- usePopup
  - 해당 애플리케이션에서 처리해야할 팝업의 종류가 많았기 때문에 프로젝트 내에서 쓰일 팝업을 관리하는 커스텀 훅을 만들었습니다.
  - 커스텀 훅에서는 useReducer를 사용하여 다양한 종류의 팝업을 쉽게 관리할 수 있게 했습니다.
- useApi
  - api를 fetch하는 커스텀 훅을 만들었습니다.
  - 기존에 사용하던 useState와 useEffect 등으로 처리하는 공통 로직을 모아 커스텀훅으로 만들어 코드의 부피를 줄이고 가독성을 증가시켰습니다.
- 필터 기능의 상태 관리
  - 백엔드에게 이슈 필터링을 요청을 보내기 위해 query-string 라이브러리를 사용하였는데, 해당 라이브러리에 맞게 파싱하기 쉬운 객체 형식으로 useState로 관리했습니다.

</div>
</details>

<details>
<summary>백엔드와의 협업</summary>
<div markdown="1">

- 백엔드 API의 응답값 구조가 변경된 사실이 공유되지 않아 에러가 발생하는 문제가 있었습니다.
  - 디버깅 후 백엔드가 제공한 데이터구조가 바뀐 것을 알아내고, api를 사용할 때 응답값부터 확인하는 습관을 들이게 되었습니다.
  - 동시에 문제의 재발 방지를 위해, API 명세를 하나의 문서 플랫폼([스프레드 시트](https://docs.google.com/spreadsheets/d/1aD81D01pda5FDAFqLY0e564VaMmMVORsvuXRfSD0TLQ/edit?gid=0#gid=0))에서 관리하고, 변경 사항이 있을 땐 해당 문서에서 명세를 반드시 변경하는 것을 부탁드렸습니다.
  - API에 대한 커뮤니케이션 창구를 단일화하여, API를 위한 커뮤니케이션 비용을 줄이고 문제 가능성을 낮췄습니다.
- 백엔드의 api가 완성되기까지 시간이 지연되는 경우가 있었습니다.
  - 작업이 미뤄지는 것은 언제나 있을 수 있는 일이라고 생각합니다.
  - 그러나, 전체 프로젝트의 일정은 최대한 지켜져야하므로, 기능을 명확히 파악하고 작업 전 API 명세에 대해 명확한 합의를 진행하고자 했습니다.
  - 이 과정을 거쳐, API가 완성되기 전 미리 합의한 구조에 맞는 mock 데이터를 구성해 프론트 코드 설계 및 코딩 작업을 진행했습니다.
  - 이에 따라 프론트엔드와 백엔드 개발 작업이 보다 원활하게 병렬적으로 진행될 수 있었고, 개발 속도와 효율성도 향상되었습니다.
- 서로의 개발 진행 상황을 자주 확인해야 함을 느꼈습니다.
  - 각자의 작업에 몰입하여 상대방에게 작업 결과를 공유하는 것을 잊는 경우가 있습니다.
  - 일례로, API 완성 후 전달 과정에서 전달이 누락되는 경우가 있었습니다.
  - 문제를 해결하기 위해, 정해진 시간에 모든 팀원이 참석하는 데일리를 진행하였고 이 시간을 활용해 작업 진행상황 등을 공유하고 노션에 기록했습니다.

</div>
</details>

<details>
<summary>데이터 구조</summary>
<div markdown="1">

- 기획서를 확인한 후, 화면을 구성하기 위해 필요한 데이터를 파악했습니다.
- 프론트엔드 개발자 입장에서 데이터를 사용하기에 효율적인 구조는 어떤 것인지 고민했고, 생각한 구조를 백엔드에게 제안했습니다.
- 그러나, 프론트엔드에게 필요한 구조가 백엔드에서는 다루기 까다로운 형태일 수 있다고 생각하여서 해당 데이터 구조가 서버 입장에서도 효율적인지, 개발 난이도와 공수는 어느정도인지 고려하고, 커뮤니케이션을 통해 늘 확인했습니다.

</div>
</details>

<details>
<summary>컴포넌트 재사용</summary>
<div markdown="1">

- 사이드바, 페이지의 헤더 부분 등 웹 페이지 내에서 재활용될 수 있는 컴포넌트를 분리하였습니다.
- props를 활용해 형식은 비슷하지만 목적 등이 다른 경우(label을 수정하거나 생성할 수 있는 폼)에는 isCreation을 불리언 값으로 전달해 코드의 반복을 줄이고 좀 더 유연한 컴포넌트를 만들었습니다.

</div>
</details>

<br/>

# 😎 **결과**

<details>
   <summary>스크린샷</summary>
   <div markdown="1">

### <strong>메인 페이지</strong>

![621DE310-5667-47EF-9009-C336DEAD4417](https://github.com/planetBing/fe-eventloop/assets/150240792/67472c75-bf22-4a66-a632-3ba7c9817204)

- 이슈 필터링, 선택한 이슈 열고 닫는 기능

<br>

### <strong>이슈 작성 페이지</strong>

![C29CF262-13B9-4B5D-8492-8F7A98F5EC98](https://github.com/planetBing/fe-eventloop/assets/150240792/8664caf5-3c8b-4f5d-acb1-537ef58f3dea)

<br>

### <strong>이슈 상세 페이지</strong>

![이슈 상세 저용량~~~](https://github.com/codesquad-members-2024/fe-24-last/assets/150240792/236d54cb-afa7-4127-bc21-84fdf467acce)

- 이슈 수정과 코멘트 추가

<br>

### <strong>label 페이지</strong>

![813B41E7-67D0-4422-B10B-A841F872758D](https://github.com/planetBing/fe-eventloop/assets/150240792/60df03b6-99e0-4d72-a3dd-82dc5d1b2fb3)

- label 추가, 편집, 삭제 기능

<br>

### <strong>milestone </strong>

![이슈트래커 마일스톤](https://github.com/planetBing/fe-eventloop/assets/150240792/50174d70-a4fb-41f3-9419-34c9fecc4879)

- 마일스톤 생성, 편집, 삭제, 열고/닫기 기능

<br>
