const URL = "https://dev2-prima.onrender.com/adjectives";
let adjectives;
let sorted = false;
let sortDirection; //true = sort down, false = sort up

function init() {
  fetch(URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      adjectives = result;
      sort();
      render();
    });
}

setInterval(init(), 1000);

function addSortEvents() {
  document.getElementById("sort-up").addEventListener("click", function () {
    if (!sorted) {
      sorted = true;
    }
    sortDirection = false; //for sort up
    sort();
    render();
  });

  document.getElementById("sort-down").addEventListener("click", function () {
    if (!sorted) {
      sorted = true;
    }
    sortDirection = true; //for sort down
    sort();
    render();
  });
}

function addVoteEvents() {
  const upDoots = document.querySelectorAll(".upvote-button");
  upDoots.forEach(function (upDoot) {
    upDoot.addEventListener("click", function () {
      upVote(upDoot.value);
    });
  });

  const downDoots = document.querySelectorAll(".downvote-button");
  downDoots.forEach(function (downDoot) {
    downDoot.addEventListener("click", function () {
      downVote(downDoot.value);
    });
  });
}

function sort() {
  let mod = 1;
  if (!sortDirection) {
    mod = -1;
  }

  if (sorted) {
    adjectives.sort(function (a, b) {
      if (a.score >= b.score) {
        return 1 * mod;
      } else {
        return -1 * mod;
      }
    });
  }
}

function render() {
  // sort buttons
  document.querySelector(".sort-buttons").innerHTML = "";
  let sortbtns = "";
  if (sorted) {
    if (sortDirection) {
      sortbtns = `
    <button id="sort-up">sort ↑</button>
    <button class="active" id="sort-down">sort ↓</button>`;
    } else {
      sortbtns = `
      <button class="active" id="sort-up">sort ↑</button>
      <button id="sort-down">sort ↓</button>`;
    }
  } else {
    sortbtns = `<button id="sort-up">sort ↑</button>
      <button id="sort-down">sort ↓</button>`;
  }
  document.querySelector(".sort-buttons").innerHTML = sortbtns;

  document.querySelector(".word-list").innerHTML = "";

  adjectives.forEach((word) => {
    let stat = "good";
    if (word.score >= 5) {
      stat = "good";
    } else {
      stat = "bad";
    }

    let html = `<div class="word-item">
    <span class="word-score ${stat}">${word.score}</span>`;
    html += `<span>${word.word}</span>
    <div class="vote-buttons">
    <button value="${word.word}" class="upvote-button">👍</button>
    <button value="${word.word}" class="downvote-button">👎</button>
    </div>`;
    document.querySelector(".word-list").innerHTML += html;
  });
  addVoteEvents();
  addSortEvents();
}

function upVote(target) {
  fetch(`https://dev2-prima.onrender.com/upvote/${target}`);
  init();
}

function downVote(target) {
  fetch(`https://dev2-prima.onrender.com/downvote/${target}`);
  init();
}

// function updateScore(word, scoreChange) {
//   const foundIndex = adjectives.findIndex(function (item, index) {
//     if (item.word == word) {
//       return true;
//     }
//   });

//   if (foundIndex != -1) {
//     let newScore = adjectives[foundIndex]["score"] + scoreChange;
//     adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
//   }
// render();
// }
init();
