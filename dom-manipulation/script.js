let display = document.getElementById("quoteDisplay");
let showQuote = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

let quote = [
  {
    text: "make haste while the sun shine",
    category: "inspirational",
  },
  { text: "kill two birds with one stone", category: "inspirational" },
];

function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quote = JSON.parse(savedQuotes);
  }
}

loadQuotes();

function loadCategory() {
  const lastCategory = localStorage.getItem("lastCategory");
  if (lastCategory) {
    categoryFilter.value = lastCategory;
    filterQuotes(); // display quotes immediately
  }
}

loadCategory();

function showRandomQuote(quotesToShow) {
  let randomIndex = Math.floor(Math.random() * quotesToShow.length);
  display.innerHTML = quotesToShow[randomIndex].text;
}

function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const quoteCategory = document.createElement("input");
  quoteCategory.id = "newQuoteCategory";
  quoteCategory.type = "text";
  quoteCategory.placeholder = "Enter quote category";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Quote";
  addBtn.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(quoteCategory);
  formDiv.appendChild(addBtn);

  document.body.appendChild(formDiv);
}

createAddQuoteForm();

function addQuote() {
  let newQuote = document.getElementById("newQuoteText");
  let newCategory = document.getElementById("newQuoteCategory");

  let newQuoteObject = {};
  newQuoteObject.text = newQuote.value;
  newQuoteObject.category = newCategory.value;
  quote.push(newQuoteObject);

  let categoryOptions = categoryFilter.options;
  let categoryExists = false;

  for (let i = 0; i < categoryOptions.length; i++) {
    if (categoryOptions[i].value === newCategory.value) {
      categoryExists = true;
      break;
    }
  }

  if (!categoryExists) {
    const option = document.createElement("option");
    option.value = newQuoteObject.category;
    option.textContent = newQuoteObject.category;
    categoryFilter.appendChild(option);
  }

  localStorage.setItem("quotes", JSON.stringify(quote));

  newCategory.value = "";
  newQuote.value = "";
}

function exportQuotes() {
  let exportString = JSON.stringify(quote);
  const exportBlob = new Blob([exportString], { type: "application/json" });
  const exportLink = URL.createObjectURL(exportBlob);
  const downloadLink = document.createElement("a");
  downloadLink.href = exportLink;
  downloadLink.download = "quotes.json";
  downloadLink.click();
  URL.revokeObjectURL(exportLink);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    const text = reader.result;
    const importedQuotes = JSON.parse(text);
    quote.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quote));
    alert("Quotes imported successfully!");
  };
}

function populateCategories() {
  const categories = quote.map((q) => q.category);
  const uniqueCategories = [...new Set(categories)];
  /*quote.forEach((q) => {
    uniqueCategories.add(q.category);
  });*/
  uniqueCategories.forEach((c) => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  let filteredCategory =
    selectedCategory === "all"
      ? quote
      : quote.filter((q) => q.category === selectedCategory);

  showRandomQuote(filteredCategory);

  localStorage.setItem("lastCategory", selectedCategory);
}

async function fetchQuotesFromServer() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();
    console.log("fetched from server:", data);
  } catch (error) {
    console.error("error fetching from server:", error);
  }
}

async function postQuoteToServer(newQuoteObject) {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuoteObject),
    });
    let data = await res.json();
    console.log("server response after post:", data);
  } catch (error) {
    console.error("error posting to server:", error);
  }
}

setInterval(() => {
  fetchQuotesFromServer();
}, 50000); // every 50 seconds

showQuote.addEventListener("click", filterQuotes);
populateCategories();

console.log(quote);
