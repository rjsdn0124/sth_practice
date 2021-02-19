/* html form으로 입력을 받아서 local storage에 저장하고
저장된 이름에게 인사하는 스크립트
*/

const greetForm = document.querySelector(".js-greetingForm");
const greetInput = greetForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_IN_LS = "currentUser";
const SHOWING_ON = "showing";

function seeResult(text){
    // form을 숨기고 text arg로 인사를 보내는 메소드
    greetForm.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function saveName(text){
    // local storage에 Name을 저장하는 메소드
    localStorage.setItem(USER_IN_LS, text)
}

function handleSubmit(event){
    // 입력을 받았을 때 인사하고 저장하는 메소드 실행 메소드
    event.preventDefault();
    const currentValue = greetInput.value;
    seeResult(currentValue);
    saveName(currentValue);
}

function askForName() {
    // 숨겨져있던 form을 띄워 Name을 입력받는 method
    greetForm.classList.add(SHOWING_ON);
    greetForm.addEventListener("submit", handleSubmit);
}

function compairName() { 
    // local storage에 저장되어 있는 value 유무를 파악하는 메소드
    const currentUser = localStorage.getItem(USER_IN_LS);
    
    if (currentUser === null){
        askForName()
    } else {
        seeResult(currentUser);
    }
}

function init(){ 
    // 실행 메소드
    compairName();
}

init();