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

## WSPN DSK CONTROLLER 작동되는 기능
![image](https://github.com/user-attachments/assets/2765c470-05bb-4a3a-b3d1-851253eeb4b3)

1. CODER ON/OFF 클릭 시 파란색 직사각형이 fade-in 형태로 나타남/한번 더 누르면 fade-in 형태로 사라짐
2. 1루 클릭 시 빨간색 직사각형이 fade-in 형태로 나타남/한번 더 누르면 fade-in 형태로 사라짐

3. CODER ON/OFF 클릭 시 옆에 있는 표시기가 ON으로 바뀜/한번 더 누르면 OFF로 표시됨
   오류 발생 시 ERR로 표시됨
4. 버튼 클릭 시 Event Log에서 로그 확인 가능
   전송 시간, 전송 메시지, 전송 내용

## 로드맵
1. 점수, 팀명 기입 후 GO버튼 클릭 시 WSPN DSK > coder에 적용되도록 제작
2. coder 디자인 및 베이스 표시 제작

3. 번거롭게 안 들어가고 딸깍하면 자동 실행되는 시스템 제작
