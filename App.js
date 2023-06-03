const searchInput = document.getElementById("search");
// const wordCard = document.createElement("p");
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

    displayData(data);
  } catch (error) {
    console.log(error);
  }

  var searchhistory = searchInput.value.trim();
  console.log(data, "dattaaaa");
  if (searchhistory !== "") {
    addhistory(searchhistory);
    searchInput.value = "";
    savedhistory();
  }
}
const displayData = (data) => {
  const wordCard = document.createElement("p");

  if (typeof data == "object" && data.title) {
    word.textContent = data.title;
    wordCard.appendChild(word);
    resultCard.appendChild(wordCard);
  } else {
    const heading = data[0].word;
    word.textContent = heading;
    wordCard.appendChild(word);
    resultCard.appendChild(wordCard);

    //idk why you are using this check... Whats the point of this condition?
    // I'll comment this line for now
    // If you added this line for a reason you can un comment it

    // const meaning = data[0].meanings[1]
    //   ? data[0]?.meanings[1]?.definitions[0]?.definition
    //   : data[0]?.meanings[2]?.definitions[0]?.definition;

    const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
    para.innerText = meaning;
    wordCard.appendChild(para);
    resultCard.appendChild(wordCard);
    const audCard = document.createElement("p");
    const audio_1 = data[0].phonetics[1].audio;
    let aud = `<audio src="${data[0].phonetics[0].audio}" controls>`;
    audCard.innerHTML = aud;
    wordCard.appendChild(audCard);
    resultCard.appendChild(wordCard);
  }
};

function addhistory(text) {
  console.log(text);
  if (!historyList) {
    createHistorylist();
    console.log("add hist");
  }
  var history = { text: text, meaning: meaning };
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
