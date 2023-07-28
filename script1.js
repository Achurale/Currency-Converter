// Replace with your API keys
const OPEN_EXCHANGE_RATES_API_KEY = 'YOUR_OXR_API_KEY';
const ZIPCODE_API_KEY = 'YOUR_ZIPCODE_API_KEY';

// Fetch available currencies from Open Exchange Rates API
fetch(`https://open.exchangerate-api.com/v6/latest?app_id=${OPEN_EXCHANGE_RATES_API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    const currencies = Object.keys(data.rates);
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencies.forEach((currency) => {
      const option1 = document.createElement('option');
      option1.text = currency;
      fromCurrencySelect.add(option1);

      const option2 = document.createElement('option');
      option2.text = currency;
      toCurrencySelect.add(option2);
    });
  });

// Function to convert currency
function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  fetch(`https://open.exchangerate-api.com/v6/convert?app_id=${OPEN_EXCHANGE_RATES_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
    .then((response) => response.json())
    .then((data) => {
      const convertedAmount = data.result.toFixed(2);
      const resultElement = document.getElementById('result');
      resultElement.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
}

// Function to get Zip Code details
function getZipCodeDetails() {
  const zipcode = document.getElementById('zipcodeInput').value;

  fetch(`https://www.zipcodeapi.com/rest/${ZIPCODE_API_KEY}/info.json/${zipcode}/degrees`)
    .then((response) => response.json())
    .then((data) => {
      const { city, state, country } = data;
      const zipcodeResultElement = document.getElementById('zipcodeResult');

      if (city && state && country) {
        zipcodeResultElement.innerHTML = `Location: ${city}, ${state}, ${country}`;
      } else {
        zipcodeResultElement.innerHTML = `Zip Code not found`;
      }
    });
}
