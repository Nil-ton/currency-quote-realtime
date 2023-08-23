const CURRENCY_QUOTE_API = async (quote) => {
  const paramsTransform = quote.replace("-", "");
  const response = await fetch(
    `https://economia.awesomeapi.com.br/last/${quote}`
  );
  const data = await response.json();
  return data[paramsTransform].ask;
};

addEventListener("message", (e) => {
  CURRENCY_QUOTE_API(e.data);
  setInterval(async () => postMessage(await CURRENCY_QUOTE_API(e.data)), 5000);
});
