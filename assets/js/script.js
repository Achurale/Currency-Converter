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