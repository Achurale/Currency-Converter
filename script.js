const countryDropDown = document.querySelectorAll('form select')

//Function for loading flag pictures

function loadFlag(element) {
  for(let code in country_list){
    if(code == element.value){
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = 'https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png';
    }
  }
}

//Add ExchangeRate-API
// let url = 'https://v6.exchangerate-api.com/v6/c5de4b3eabcc6e28bbe2a088/latest/USD';


const OPEN_EXCHANGE_RATES_API_KEY = 'c5de4b3eabcc6e28bbe2a088';
// const ZIPCODE_API_KEY = 'YOUR_ZIPCODE_API_KEY';

// https://v6.exchangerate-api.com/v6/c5de4b3eabcc6e28bbe2a088/pair/EUR/GBP/12
// fetch(`https://open.exchangerate-api.com/v6/latest?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`)

function callApi() {  
  const amount = document.querySelector("#from").value;
  const currencyA = document.querySelector("#currencyA").value
  const currencyB = document.querySelector("#currencyB").value

  fetch(`https://v6.exchangerate-api.com/v6/${OPEN_EXCHANGE_RATES_API_KEY}/pair/${currencyA}/${currencyB}/${amount}`)
  .then(response=>response.json())
  .then(data1=>{

    const convResult = data1.conversion_result // 10.29 
    const convElement = document.querySelector("#converted");
    convElement.value = convResult;
    console.log(data1);
  })
}

fetch(`https://open.exchangerate-api.com/v6/latest?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`)
  .then((response) => response.json())
  .then((data1) => {
    const currencies = Object.keys(data1.rates);
    const fromCurrencySelect = document.getElementById('currencyA');
    const toCurrencySelect = document.getElementById('currencyB');

    currencies.forEach((currency) => {
      const option1 = document.createElement('option');
      option1.text = currency;
      fromCurrencySelect.add(option1);

      const option2 = document.createElement('option');
      option2.text = currency;
      toCurrencySelect.add(option2);
    });
  });


  function convertCurrency() {
    const amount = document.getElementById('from').value;
    const fromCurrency = document.getElementById('currencyA').value;
    const toCurrency = document.getElementById('currencyB').value;
  
    fetch(`https://open.exchangerate-api.com/v6/convert?app_id=${OPEN_EXCHANGE_RATES_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then((response) => response.json())
      .then((data1) => {
        const convertedAmount = data1.result.toFixed(2);
        const resultElement = document.getElementById('converted');
        resultElement.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      });
  }

  // Script for translator

var fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchageIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("#choice"),
icons = document.querySelectorAll(".row i");
translateBtn = document.querySelector("button"),

selectTag.forEach((tag, id) => {
    for (let country_code in countries) {
        let selected = id == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "en-GB" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchageIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    toText.value = tempText;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

fromText.addEventListener("keydown", () => {
    if(!fromText.value) {
        toText.value = "";
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let requestUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(requestUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !toText.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        }
    });
});


// Code for the notepad

document.addEventListener('DOMContentLoaded', function(){

  var savedContent = localStorage.getItem("notes");
  if(savedContent != null){
    document.getElementById("text").value = savedContent;
  }
 
 document.getElementById("text").onkeyup = function(){
  var data = document.getElementById("text").value;  localStorage.setItem("notes", data);
 }
});