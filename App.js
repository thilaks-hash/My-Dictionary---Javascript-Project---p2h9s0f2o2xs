const searchInput = document.getElementById("search");
const wordCard = document.createElement("p");
const resultCard = document.getElementById("cards");
const word = document.createElement("h2");
const para = document.createElement("p");
const audio = document.createElement("audio");
const historybutton = document.getElementById("searchHistory-btn");
const searchList = document.getElementById("historylist");
var historyList = null;
var searchlist = [];
window.addEventListener("load", function () {
  var savedhistory = localStorage.getItem("searchlist");
  if (savedhistory) {
    searchlist = JSON.parse(savedhistory);
    createHistorylist();
    renderHistory();
  }
});
async function search() {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value.toLowerCase()}`
    );
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.log("error");
  }
  console.log("seaaa");
  var searchhistory = searchInput.value.trim();
  if (searchhistory !== "") {
    addhistory(searchhistory);
    searchInput.value = "";
    console.log("search");
    savedhistory();
  }
}
const displayData = (data) => {
  console.log("start");
  const heading = data[0].word;
  word.textContent = heading;
  wordCard.appendChild(word);
  const meaning = data[0].meanings[1]
    ? data[0].meanings[1].definitions[0].definition
    : data[0].meanings[2].definitions[0].definition;
  console.log(meaning);
  para.innerText = meaning;
  wordCard.appendChild(para);

  const audio_1 = data[0].phonetics[0].audio;
  audio.src = audio_1;
  audio.controls = true;
  wordCard.appendChild = audio_1;
  resultCard.appendChild(wordCard);
};
function addhistory(text) {
  if (!historyList) {
    createHistorylist();
    console.log("add hist");
  }
  var history = { text: text };
  searchlist.push(history);
  renderHistorylist(history);
}
function renderHistory() {
  searchlist.forEach(function (history) {
    renderHistorylist(history);
  });
}

function renderHistorylist(history) {
  var li = document.createElement("li");
  var textNode = document.createTextNode(history.text);
  li.appendChild(textNode);
  historyList.appendChild(li);
}
function createHistorylist() {
  historyList = document.createElement("ul");
  historyList.style.display = "none";
  searchList.appendChild(historyList);
}
function savedhistory() {
  localStorage.setItem("searchlist", JSON.stringify(searchlist));
}
