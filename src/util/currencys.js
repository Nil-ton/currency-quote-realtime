const currencys = ["BRL", "USD", "EUR", "BTC", "JPY"];
const combinations = [];

for (let i = 0; i < currencys.length; i++) {
  for (let j = 0; j < currencys.length; j++) {
    if (i !== j) {
      const combination = `${currencys[i]}-${currencys[j]}`;
      combinations.push(combination);
    }
  }
}

export { combinations };
