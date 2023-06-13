var histroyList = document.getElementById("histroylist");
var searchList = localStorage.getItem("searchlist");
var searchCard = window.addEventListener("load", function () {
  if (searchList) {
    searchList = JSON.parse(searchList);

    searchList.forEach(function (searches) {
      console.log(searches);
      let texts = searches.text;
      var listItem = document.createElement("li");
      var listdef = document.createElement("p");
      listItem.textContent = searches.text;
      listdef.textContent = searches.meaning;
      histroyList.appendChild(listItem);
      histroyList.appendChild(listdef);
      const deletebutton = document.createElement("button");
      deletebutton.setAttribute("id", "deletebutton");
      deletebutton.innerHTML = "delete";
      histroyList.appendChild(deletebutton);
      deletebutton.addEventListener("click", () => {
        var itemRemoved = listdef.textContent;
        listdef.innerText = "";

        for (let i = 0; i < searchList.length; i++) {
          if (searchList[i].meaning === itemRemoved) {
            var item = localStorage.key(i);

            localStorage.removeItem(item);
          }
        }

        let temp = searchList.filter((item) => item.text != texts);
        localStorage.setItem("searchlist", JSON.stringify(temp));
        // delete localStorage.searches.text;
      });
    });
  }
});
