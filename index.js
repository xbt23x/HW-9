let gameArray = [];
let selectedGenre = "not selected";

// define a constructor to create player objects
var GameObject = function (pGame, pConsole, pGenre, pPublisher, pDeveloper, pReview, pRating) {
  this.Game = pGame;
  this.Console = pConsole;
  this.ID = gameArray.length + 1;
  this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
  this.Publisher = pPublisher;
  this.Developer = pDeveloper;
  this.Review = pReview;
  this.Rating = pRating;
}

gameArray.push(new GameObject("Minecraft", "Xbox", "Adventure", "Microsoft", "Mojang", "Fun game to play with friends. Survive by gathering materials and food to build a community","5 &#9733;"));
gameArray.push(new GameObject("Overwatch", "PC", "FPS", "Blizzard", "Blizzard", "Challening online shooter. Unique heroes with competitive online gameplay against other players.","4 &#9733;"));
gameArray.push(new GameObject("God of War", "PS4", "Adventure", "Sony Interactive Entertainment", "SIE Santa Monica", "This is an action adventure game where players are guided through narrative driven world. Challening combat.","5 &#9733;"));

document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("buttonAdd").addEventListener("click", function () {
    gameArray.push(new GameObject(document.getElementById("game").value, document.getElementById("console").value,
        selectedGenre, document.getElementById("publisher").value, document.getElementById("developer").value, document.getElementById("review").value, selectedRating));
});

  $(document).bind("change", "#select-genre", function (event, ui) {
    selectedGenre = $('#select-genre').val();
  });

  $(document).bind("change", "#select-rating", function (event, ui) {
        selectedRating = $('#select-rating').val();
    });

  document.getElementById("buttonSortGame").addEventListener("click", function () {
    gameArray.sort(dynamicSort("Game"));
    createList();
    document.location.href = "index.html#ListAll";
  });

  document.getElementById("buttonSortGenre").addEventListener("click", function () {
    gameArray.sort(dynamicSort("Genre"));
    createList();
    document.location.href = "index.html#ListAll";
  });

$(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
 // document.getElementById("IDparmHere").innerHTML = "";
  createList();
});
  
  document.getElementById("buttonClear").addEventListener("click", function () {
    document.getElementById("game").value = "";
    document.getElementById("console").value = "";
    document.getElementById("publisher").value = "";
    document.getElementById("developer").value = "";
    document.getElementById("review").value = "";
    
  });
  
$(document).on("pagebeforeshow", "#Load", function (event) {   // have to use jQuery 
  document.getElementById("game").value = "";
  document.getElementById("console").value = "";
  document.getElementById("publisher").value = "";
  document.getElementById("developer").value = "";
  document.getElementById("review").value = "";
  
  });

$(document).on("pagebeforeshow", "#page3", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("oneGame").innerHTML = "The game is: " + gameArray[localID-1].Game;
  document.getElementById("oneConsole").innerHTML = "Console reviewed on: " + gameArray[localID - 1].Console;
  document.getElementById("oneGenre").innerHTML = "Genre: " + gameArray[localID - 1].Genre;
  document.getElementById("onePublisher").innerHTML = "Developer: " + gameArray[localID - 1].Developer;
  document.getElementById("oneDeveloper").innerHTML = "Publisher: " + gameArray[localID - 1].Publisher;
  document.getElementById("oneReview").innerHTML = "Review: " + gameArray[localID - 1].Review;
  document.getElementById("oneRating").innerHTML = "Rating: " + gameArray[localID - 1].Rating;
 });

});

function createList()
{
  // clear prior data
  var divUserlist = document.getElementById("divGameList");
  while (divGameList.firstChild) {    // remove any old data so don't get duplicates
  divGameList.removeChild(divGameList.firstChild);
  };

  var ul = document.createElement('ul');  
  console.log(gameArray);
  gameArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = "<a data-transition='pop' class='oneGame' data-parm=" + element.ID + "  href='#page3'>Get Details </a> " + element.ID + ":  " + element.Game + "  " + element.Genre;
    ul.appendChild(li);
  });
  divGameList.appendChild(ul)

    //set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneGame");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page3";
        });
    });
   
};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
  var sortOrder = 1;

  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    if (sortOrder == -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  }
}