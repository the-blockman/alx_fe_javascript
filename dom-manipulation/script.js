let display = document.getElementById("quoteDisplay");
let showQuote = document.getElementById("newQuote");
let newQuote = document.getElementById("newQuoteText");
let newCategory = document.getElementById("newQuoteCategory");

let quote = [
  {
    text: "make haste while the sun shine",
    category: "inspirational",
  },
  { text: "kill two birds with one stone", category: "inspirational" },
];

function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quote.length);
  display.innerHTML = quote[randomIndex].text;
}

function addQuote() {
  let newQuoteObject = {};
  newQuoteObject.text = newQuote.value;
  newQuoteObject.category = newCategory.value;
  quote.push(newQuoteObject);

  newCategory.value = "";
  newQuote.value = "";
}

showQuote.addEventListener("click", showRandomQuote);
