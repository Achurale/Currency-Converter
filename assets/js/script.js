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
const ZIPCODE_API_KEY = 'YOUR_ZIPCODE_API_KEY';

// https://v6.exchangerate-api.com/v6/c5de4b3eabcc6e28bbe2a088/pair/EUR/GBP/12
// fetch(`https://open.exchangerate-api.com/v6/latest?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`)

function callApi() {  
  const amount = document.querySelector("#from").value;
  const currencyA = document.querySelector("#currencyA").value
  const currencyB = document.querySelector("#currencyB").value

  fetch(`https://v6.exchangerate-api.com/v6/${OPEN_EXCHANGE_RATES_API_KEY}/pair/${currencyA}/${currencyB}/${amount}`)
  .then(response=>response.json())
  .then(data=>{

    const convResult = data.conversion_result // 10.29 
    const convElement = document.querySelector("#converted");
    convElement.value = convResult;
    console.log(data);
  })
}

fetch(`https://open.exchangerate-api.com/v6/latest?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);
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
      .then((data) => {
        const convertedAmount = data.result.toFixed(2);
        const resultElement = document.getElementById('converted');
        resultElement.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      });
  }