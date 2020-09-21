//? Project Name
const projectName = "random-quote-machine";
//? set item into storage
localStorage.setItem("example_project", "Random Quote Machine");
//? variable quotesData
let quotesData;

// !check if there is a window or a particular opened website
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// ?colors for background
var colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

//?variables for the Quote and Author
var currentQuote = "";
var currentAuthor = "";

//? check if the url is open
function openURL(url) {
  window.open(
    url,
    "Share",
    "width=500",
    (height = 400),
    (toolbar = 0),
    (scrollbars = 1),
    (location = 0),
    (statusbar = 0),
    (menubar = 0),
    (resizable = 0)
  );
}

// *function to get quotes from github json file
function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json",
    },
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
        console.log("quotesData");
        console.log(quotesData);
      }
    },
  });
}

//?randomized the quotes
function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

//*getting the quotes
function getQuote() {
  //?placing the value of the random quote into the var
  let randomQuote = getRandomQuote();
  //? categorizing the quote for the quote and author into var
  currentAuthor = randomQuote.author;
  currentQuote = randomQuote.quote;

  //* if the button for the twitter is clicked
  if (inIframe()) {
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );
  }

  // ?animate the quote-text for 500 milliseconds and also assigning the text with jQuery
  $(".quote-text").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  //? animate the author-text and assigning the text from the var with jQuery
  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });

  //? randomized the background color and then place it into a jQuery
  var color = Math.floor(Math.random() * colors.length);
  //?animate the change of colors in span of 1s
  $("html-body").animate(
    {
      backgroundColor: color[color],
      color: colors[color],
    },
    1000
  );

  //? animate the button
  $(".button").animate(
    {
      backgroundColor: color[color],
    },
    1000
  );
}

//? ready the jQuery document and setup
$(document).ready(function () {
  //?
  getQuotes().then(() => {
    getQuote();
  });

  //? event listener if the new quote is clicked
  $("#new-quote").on("click", getQuote);

  //? tweet button event listener
  $("tweet-quote").on("click", function () {
    if (!inIframe()) {
      openURL(
        "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
          encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
      );
    }
  });
});
