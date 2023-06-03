var histroyList = document.getElementById("histroylist");
var searchList = localStorage.getItem("searchlist");

window.addEventListener("load", function () {
  if (searchList) {
    searchList = JSON.parse(searchList);

    searchList.forEach(function (searches) {
      console.log(searches);
      var listItem = document.createElement("li");
      listItem.textContent = searches.text;
      histroyList.appendChild(listItem);
    });
  }
});
