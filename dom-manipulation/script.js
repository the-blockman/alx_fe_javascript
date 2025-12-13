let display = document.getElementById("quoteDisplay");
let newQuote = document.getElementById("newQuote");

let quote = [
  {
    text: "make haste while the sun shine",
    category: "inspirational",
  },
  { text: "kill two birds with one stone", category: "inspirational" },
];

function showRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quote.length);
  display.textContent = quote[randomIndex].text;
}

newQuote.addEventListener("click", showRandomQuote);
