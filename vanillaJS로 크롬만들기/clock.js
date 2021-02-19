/* js 기능을 이용해 시간을 실시간으로 표시하는 스크립트
*/

const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-whatTime");

function getTime() { 
  //시간을 받아오고 표시하는 메소드
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() { 
  // 실행 메소드
    getTime();
    setInterval(getTime, 1000);
}
init();
