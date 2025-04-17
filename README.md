## 실행 전
node.js 설치
VSC에 ``` npm init ``` 으로 npm 설치 후 ``` npm install express ``` 로  node_module 설치

## 실행방법

터미널에서 ``` npm server.js ``` 실행하면 자동으로 WSPN DSK CONTROLLER 열림

OBS에서 사용 시 소스 영역에서 '+' > '브라우저' 선택 후 

- URL: ``` http://localhost:5000/wspndskeyer.html ```
- 너비: 1920
- 높이: 1080

위와 같이 설정하면 사용 가능

WSPN DSK CONTROLLER에 있는 'CG창 열기' 클릭 시 ``` http://localhost:5000/wspndskeyer.html ``` 이 브라우저에서 열림

wspndskeyer.html 수정 시 서버 재시작 해야 적용.

이때 WSPN DSK CONTROLLER가 새로 열리는데 기존에 열려있던거 새로고침 후 사용도 가능

## WSPN DSK CONTROL에서 현재 작동되는 기능

(좌)WSPN DSK CONTROL / (우)WSPN DSK 코더

![컴포지션 4_00000](https://github.com/user-attachments/assets/3a7d68f6-d9c9-463f-9c98-35e2cf26bbb7)

1. CODER ON/OFF 시 코더 페이드 / 와이프 인 아웃
2. 팀명, 점수, B/S/O 카운트, 도루, 이닝 및 TOP/BOTTM 표시

## 로드맵
단기 로드맵
1. 코더의 아래 빈 공간에 투수 및 타자 정보 표시 제작
2. 삼진 아웃K와 노아웃K, 홈런 애니메이션 제작 (영상으로 만들지, css 애니메이션 사용할 지 미정)
3. script 영역을 js파일로 분리: 스크립트 길어지면서 관리효율 떨어짐
4. css 최적화: class로 UI 요소 규격화 후html에서 class 두개 사용

   (ex. class="coder-btn 15px")


장기 로드맵
1. 투수 및 타자 원샷 잡혔을 때 정보 표시 제작 (선수 프로필 및 각종 기록)
2. 번거롭게 안 들어가고 딸깍하면 자동 실행되는 시스템 제작


기타
1. 피그마 UI 제작 (css UI 규격화 연장선)
