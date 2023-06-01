const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const wordCard = document.createElement("div");
const audioCard = document.createElement("div");
const heading = document.createElement("h1");
const meaning = document.createElement("p");
const audio = document.createElement("audio");
const resultCard1 = document.getElementById("cards");

const resultCard = document.createElement("div");
const audioCards = document.getElementById("audio");
const historybutton = document.getElementById("searchHistory-btn");
const displaySearch = document.createElement("p");

searchButton.addEventListener("click", async () => {
  try {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value.toLowerCase()}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.log(error);
  }
});
function displayData(data) {
  if (data[0].word !== data[0].word) {
    console.log("not found");
  } else {
    const wordhead = data[0].word;
    heading.textContent = wordhead;
    wordCard.appendChild(heading);
    const definition = data[0].meanings[2]
      ? data[0].meanings[2].definitions[0].definition
      : data[0].meanings[1].definitions[0].definition;
    meaning.innerHTML = definition;
    wordCard.appendChild(meaning);
  }
  //console.log(searchInput.value);

  const aud = data[0].phonetics[1].audio;

  audio.src = aud;
  audio.controls = true;
  audioCard.appendChild(audio);
  audioCard.style.borderRadius = "5px";
  audioCard.style.backgroundColor = "#ccc";
  audioCard.style.color = "black";
  audioCard.style.padding = "10px";
  audioCard.style.minwidth = "10px";
  audioCard.style.minheight = "100px";
  audioCard.style.textAlign = "center";
  audioCards.appendChild(audioCard);

  resultCard.appendChild(wordCard);
  resultCard.style.borderRadius = "5px";
  resultCard.style.backgroundColor = "#ccc";
  resultCard.style.color = "black";
  resultCard.style.padding = "10px";
  resultCard.style.minwidth = "10px";
  resultCard.style.minheight = "100px";
  resultCard.style.margin = "50px";
  resultCard.style.textAlign = "center";
  resultCard1.appendChild(resultCard);

  var searchHistory = [];
  const unlist = document.createElement("ul");
  const searchh = document.getElementById("searchHistory");
  function handleHistory() {
    var searchvalue = searchInput.value;
    searchHistory.push(searchvalue);
    updatesearch();
  }
  function updatesearch() {
    searchHistory.map((items) => {
      const searchitem = document.createElement("li");
      searchitem.textContent = items;
      displaySearch.appendChild(searchitem);
    });
    console.log(displaySearch);
    unlist.append(displaySearch);
    searchh.append(unlist);
  }
  handleHistory();
}

// <----------------------SEARCH HISTORY---------------->
// const searchHistoryList = document.createElement("ul");
// historybutton.addEventListener("click", handleHistory());

// function handleHistory() {
//   var searchHistory = localStorage.getItem("searchHistory");
//   if (!searchHistory) {
//     searchHistory = [];
//   } else {
//     searchHistory = JSON.parse(searchHistory);
//   }
//   var searchTerm = searchInput.value;
//   //console.log(searchTerm);
//   searchHistory.push(searchTerm);
//   console.log(searchHistory);
//   localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

//   const list = searchHistory.map((items) => {
//     const searchlist = document.createElement("li");
//     //   console.log(items);
//     searchlist.textContent = items;
//     console.log(searchlist);
//     searchHistoryList.appendChild(searchlist);
//   });
// }
