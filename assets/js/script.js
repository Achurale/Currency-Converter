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
let url = 'https://v6.exchangerate-api.com/v6/c5de4b3eabcc6e28bbe2a088/latest/USD';

for (let i = 0; i < countryDropDown.length; i++) {
  for(let currency_code in country_list){
      // selecting USD by default as FROM currency and NPR as TO currency
      let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
      // creating option tag with passing currency code as a text and value
      let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
      // inserting options tag inside select tag
      countryDropDown[i].insertAdjacentHTML("beforeend", optionTag);
  }
  // dropList[i].addEventListener("change", e =>{
  //     loadFlag(e.target); // calling loadFlag with passing target element as an argument
  // });
}