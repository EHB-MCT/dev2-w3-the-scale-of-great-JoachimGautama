import { getAdjectives } from "./data.js";

let adjectives;
let sorted = false;
let sortDirection; //true = sort down, false = sort up

function init() {
  const adj = getAdjectives();
  adjectives = JSON.parse(adj);
  console.log(adjectives);
  render();
}

function addSortEvents() {
  document.getElementById("sort-up").addEventListener("click", function () {
    if (!sorted) {
      sorted = true;
    }
    sortDirection = false; //for sort up
    sort();
    render();
    console.log("true");
  });

  document.getElementById("sort-down").addEventListener("click", function () {
    if (!sorted) {
      sorted = true;
    }
    sortDirection = true; //for sort down
    sort();
    render();
    console.log("false");
  });
}

function addVoteEvents() {
  //TODO
  const upDoots = document.querySelectorAll(".upvote-button");
  upDoots.forEach((upDoot) => {
    console.log("up");
    upDoot.addEventListener("click", function () {
      upVote(this.value);
    });
  });

  const downDoots = document.querySelectorAll(".downvote-button");
  downDoots.forEach(function (downDoot) {
    console.log("up");

    downDoot.addEventListener("click", function () {
      downVote(this.value);
    });
  });
}

function sort() {
  let mod = 1;
  if (!sortDirection) {
    mod = -1;
  }

  adjectives.sort(function (a, b) {
    if (a.score >= b.score) {
      return 1 * mod;
    } else {
      return -1 * mod;
    }
  });
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
    html += `<span>${word.word}</span>`;
    html += `<div class="vote-buttons">
        <button value="${word.value}" class="upvote-button">👍</button>
        <button value="${word.value}" class="downvote-button">👎</button>
    </div>`;
    document.querySelector(".word-list").innerHTML += html;
  });

  addSortEvents();
}

function upVote(target) {
  // TODO
  updateScore(target, 1);
  console.log("up");
}

function downVote(target) {
  // TODO
  updateScore(target, -1);
  console.log("down");
}

function updateScore(word, scoreChange) {
  const foundIndex = adjectives.findIndex(function (item, index) {
    if (item.word == word) {
      return true;
    }
  });

  if (foundIndex != null) {
    let newScore = adjectives[foundIndex]["score"] + scoreChange;
    adjectives[foundIndex]["score"] = Math.round(newScore * 100) / 100;
  }
}
init();
