const bgBody = document.querySelector("body");

const IMG_AMOUNT = 3;


function paintImage(imgNumber){
    // 배경에 사진을 삽입하는 메소드
    const image = new Image();
    image.src = `이미지자료/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    bgBody.appendChild(image);
}

function getRandom(){
    // 순서를 랜덤으로 설정하기 위한 랜덤 메소드
    const number = Math.floor(Math.random() * IMG_AMOUNT);
    return number;
}

function init(){
    // 실행 메소드
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();