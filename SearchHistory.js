var histroyList = document.getElementById("histroylist");
var searchList = localStorage.getItem("searchlist");

function deleteItemFromLocalStorage(index) {
  const storedItems = JSON.parse(localStorage.getItem("searchlist")) || [];
  const updatedItems = storedItems.filter((item) => item.index !== index);
  console.log(updatedItems, "updatedItems");
  localStorage.setItem("searchlist", JSON.stringify(updatedItems));
}

var searchCard = window.addEventListener("load", function () {
  if (searchList) {
    searchList = JSON.parse(searchList);
    searchList.forEach(function (searches, index) {
      var listItem = document.createElement("li");
      listItem.style.listStyle = "none";
      var listdef = document.createElement("p");
      var historylist1 = document.createElement("div");
      listItem.textContent = searches.text;
      listdef.textContent = searches.meaning;
      historylist1.appendChild(listItem);
      historylist1.appendChild(listdef);
      const deletebutton = document.createElement("button");
      deletebutton.setAttribute("id", "deletebutton");
      deletebutton.innerHTML = "delete";
      historylist1.appendChild(deletebutton);
      histroyList.appendChild(historylist1);
      historylist1.setAttribute("class", "resultcard");
      deletebutton.addEventListener("click", () => {
        deleteItemFromLocalStorage(index);
        historylist1.style.display = "none";
      });
    });
  }
});
