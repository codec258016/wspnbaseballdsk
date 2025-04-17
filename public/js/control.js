
const ws = new WebSocket('ws://localhost:5000'); // 전역에 한 번만 선언

ws.onopen = () => {
  console.log('WebSocket 연결됨');
};

ws.onmessage = (event) => {
    try {
      const msg = JSON.parse(event.data);
      const logArea = document.getElementById('logArea');
      logArea.scrollTop = logArea.scrollHeight;

      // 로그 출력
      const logParagraph = document.querySelector('#logArea p');
      if (msg.type === 'log' && logParagraph) {
        const logLine = document.createElement('div');

        const now = new Date();
        const timeString = now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });

        logLine.textContent = `${timeString} :: ${msg.payload}`;
        logParagraph.appendChild(logLine);
        logParagraph.scrollTop = logParagraph.scrollHeight;
        return;
      }

      // 점수 업데이트 메시지는 무시
      if (msg.type === 'score-update') {
        console.log('점수 메시지 수신:', msg.payload);
        return;
      }

    } catch (e) {
      // 일반 텍스트 메시지 (ex: coder-on)
      const msg = event.data;
      const coderStatus = document.getElementById('coderStatus');

      if (msg === 'coder-on') {
        coderStatus.innerText = 'ON';
        coderStatus.style.backgroundColor = '#27C0A2';
      } else if (msg === 'coder-off') {
        coderStatus.innerText = 'OFF';
        coderStatus.style.backgroundColor = '#131313';
      } else if (
        msg === 'base1-on' || msg === 'base1-off' ||
        msg === 'base2-on' || msg === 'base2-off' ||
        msg === 'base3-on' || msg === 'base3-off' ||
        msg === 'outk-on' || msg === 'no-outk-on' ||
        msg === 'homerun-on' || msg === '2homerun-on' ||
        msg === '3homerun-on'
      ) {
        console.log('메시지 수신:', msg);
      } else {
        coderStatus.innerText = 'ERR';
        coderStatus.style.backgroundColor = 'red';
        console.error('알 수 없는 메시지:', msg);
      }
    }
  };

let isRectangleVisible = false;

function opendsker() {
  window.open('http://localhost:5000/wspndskeyer.html', '_blank');
}

/*코더 ON/OFF*/
let isCoderOn = false;

function toggleCoder() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = isCoderOn ? 'coder-off' : 'coder-on';
    ws.send(msg);
    console.log('메시지 전송:', msg);
    isCoderOn = !isCoderOn;
  }
}

/*베이스 ON/OFF*/
let isBase1On = false;

function toggleBase1() {
  const button = document.querySelector('.base1');

  if (ws.readyState === WebSocket.OPEN) {
    const msg = isBase1On ? 'base1-off' : 'base1-on';
    ws.send(msg);
    console.log('메시지 전송:', msg);
    button.style.backgroundColor = isBase1On ? '#c7c7c7' : '#27C0A2';
    isBase1On = !isBase1On;
  } else {
    console.warn('WebSocket이 아직 연결되지 않았습니다.');
  }
}

let isBase2On = false;

function toggleBase2() {
  const button = document.querySelector('.base2');

  if (ws.readyState === WebSocket.OPEN) {
    const msg = isBase2On ? 'base2-off' : 'base2-on';
    ws.send(msg);
    console.log('메시지 전송:', msg);
    button.style.backgroundColor = isBase2On ? '#c7c7c7' : '#27C0A2';

    isBase2On = !isBase2On;
  } else {
    console.warn('WebSocket이 아직 연결되지 않았습니다.');
  }
}

let isBase3On = false;

function toggleBase3() {
  const button = document.querySelector('.base3');

  if (ws.readyState === WebSocket.OPEN) {
    const msg = isBase3On ? 'base3-off' : 'base3-on';
    ws.send(msg);
    console.log('메시지 전송:', msg);
    button.style.backgroundColor = isBase3On ? '#c7c7c7' : '#27C0A2';

    isBase3On = !isBase3On;
  } else {
    console.warn('WebSocket이 아직 연결되지 않았습니다.');
  }
}

/*코더 점수 변경*/
  function Coderchange() {
  const awayTeam = document.getElementById('away-tn').value.trim();
  const homeTeam = document.getElementById('home-tn').value.trim();
  const awayScore = document.getElementById('away-sc').value;
  const homeScore = document.getElementById('home-sc').value;

  if (awayTeam === '' || homeTeam === '') {
  alert('팀 이름을 모두 입력해주세요.');
  return;
  }

  const message = {
    type: 'score-update',
    payload: {
      awayTeam,
      homeTeam,
      awayScore,
      homeScore
    }
  };

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

//BSO 체인지 버튼 강조
document.addEventListener('DOMContentLoaded', () => {
    const updateBtn = document.getElementById('updateBtn');
  
    // ✅ 감지할 입력 필드들
    const fields = ['inningnum', 'matchstate', 'ballcount', 'strikecount', 'outcount'];
  
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        // select → change, input → input 이벤트 처리
        el.addEventListener('change', () => {
          updateBtn.style.backgroundColor = '#FFBA00';
        });
        el.addEventListener('input', () => {
          updateBtn.style.backgroundColor = '#FFBA00';
        });
      }
    });
  });



/*이닝 정보 업데이트*/
function InningUpdate() {
  const inningNum = document.getElementById('inningnum').value;
  const matchState = document.getElementById('matchstate').value;
  const ballCount = document.getElementById('ballcount').value;
  const strikeCount = document.getElementById('strikecount').value;
  const outCount = document.getElementById('outcount').value;

  const message = {
    type: 'inning-update',
    payload: {
      inningNum,
      matchState,
      ballCount,
      strikeCount,
      outCount
    }
  };

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }

  // ✅ 버튼 색 원상 복구
  document.getElementById('updateBtn').style.backgroundColor = '';
}

/*BSO 초기화 및 채인지 버튼 강조*/
function Reset() {
  document.getElementById('ballcount').value = 0;
  document.getElementById('strikecount').value = 0;
  document.getElementById('outcount').value = 0;

    // ✅ Update 버튼을 노란색으로 표시
    const updateBtn = document.getElementById('updateBtn');
    if (updateBtn) {
      updateBtn.style.backgroundColor = '#FFBA00';
    }
}

/*out K*/
function toggleOutK() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = 'outk-on';
    ws.send(msg);
  }
}
/*no out K*/
function toggleNoOutK() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = 'no-outk-on';
    ws.send(msg);
  }
}

/*home run*/
function toggleHomrun() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = 'homerun-on';
    ws.send(msg);
  }
}
/*2home run*/
function toggle2Homrun() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = '2homerun-on';
    ws.send(msg);
  }
}
/*3home run*/
function toggle3Homrun() {
  if (ws.readyState === WebSocket.OPEN) {
    const msg = '3homerun-on';
    ws.send(msg);
  }
}
