const searchInput = document.getElementById("search");
const resultCard = document.getElementById("cards");

const word = document.createElement("h2");
const para = document.createElement("p");
const audio = document.createElement("audio");
const historybutton = document.getElementById("searchHistory-btn");
const searchList = document.getElementById("historylist");
var historyList = null;
var searchlist;
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

    var searchhistory = searchInput.value.trim();

    displayData(data, searchhistory);
  } catch (error) {
    console.log(error);
  }

  var searchhistory = searchInput.value.trim();

  if (searchhistory !== "") {
    searchInput.value = "";
    savedhistory();
  }
}
const displayData = (data, searchhistory) => {
  const wordCard = document.createElement("p");

  if (typeof data == "object" && data.title) {
    const result = data.title;
    word.textContent = result;
    wordCard.appendChild(word);
    resultCard.appendChild(wordCard);
    addhistory(searchhistory, result);
  } else {
    const heading = data[0].word;
    word.textContent = heading;
    wordCard.appendChild(word);
    resultCard.appendChild(wordCard);

    const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
    para.innerText = meaning;
    wordCard.appendChild(para);
    resultCard.appendChild(wordCard);
    const audio_1 = data[0].phonetics[1].audio;
    audio.src = audio_1;
    audio.controls = true;
    audio.style.backgroundColor = "black";
    audio.style.padding = "5px";
    wordCard.appendChild(audio);
    resultCard.appendChild(wordCard);
    resultCard.setAttribute("class", "resultcard");
    const searchList = JSON.parse(localStorage.getItem("searchlist")) || [];
    var index = searchList.length;
    console.log(searchList, "searchList");
    addhistory(searchhistory, meaning, index);
  }
};

function addhistory(text, meaning, index) {
  if (!historyList) {
    createHistorylist();
  }
  var history = { text: text, meaning: meaning };
  searchlist.push({ index, text, meaning });
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
  console.log(historyList, "historyList");
  searchList.appendChild(historyList);
  console.log(searchList);
}
function savedhistory() {
  localStorage.setItem("searchlist", JSON.stringify(searchlist));
}
