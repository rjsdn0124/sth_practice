const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_IN_LS = "toDos";

let toDos = [];

function saveToDos() {
  // local storage에 리스트를 저장하는 메소드
  localStorage.setItem(TODOS_IN_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  // x버튼을 누르면 삭제시키는 메소드
  const btn = event.target;
  const li = btn.parentNode;
  let parsedLiId = parseInt(li.id);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    if(parsedLiId < toDo.Id){
      toDo.Id = parsedLiId++;
      return true;
    }else {
    return toDo.Id !== parseInt(li.id);
    }
  });
  toDos = cleanToDos;
  saveToDos();
}

function seeResult(text) {
  // 웹에서 보여지는 창을 만들고 local storage 저장양식을 만드는 메소드
  const list = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text + " ";
  list.appendChild(span);
  list.appendChild(delBtn);
  list.id = newId;
  toDoList.appendChild(list);
  const toDoObj = {
    text: text,
    Id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  // form 설정 메소드
  event.preventDefault();
  const currentValue = toDoInput.value;
  seeResult(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  // 새로 들어왔을 때 로컬 스토리지에 저장된 todolist를 가져오는 메소드
  const loadedToDos = localStorage.getItem(TODOS_IN_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      seeResult(toDo.text);
    });
  }
}

function init() {
  // 실행 메소드
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
