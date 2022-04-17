import tpl from "./info.tpl";

const info = tpl({
  name: "jet",
  age: 34,
  career: "前端实习生",
  hobby: "game/篮球",
});

console.log(info);

const oApp = document.querySelector("#root");

oApp.innerHTML = info;
