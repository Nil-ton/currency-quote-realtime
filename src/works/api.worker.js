const month = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function generateDate() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, "0");
  const monthIndex = date.getMonth();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");

  return `${day} de ${month[monthIndex]}., ${hour}:${min} UTC-3`;
}

function generateHoursAndSeconds() {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hour}:${min}:${seconds}`;
}

const CURRENCY_QUOTE_API = async (quote) => {
  const paramsTransform = quote.replace("-", "");
  const response = await fetch(
    `https://economia.awesomeapi.com.br/last/${quote}`
  );
  const data = await response.json();
  const date = generateDate();
  const hoursAndSeconds = generateHoursAndSeconds();
  return {
    ...data[paramsTransform],
    date: date,
    hoursAndSeconds: hoursAndSeconds,
  };
};

addEventListener("message", (e) => {
  CURRENCY_QUOTE_API(e.data);
  setInterval(async () => postMessage(await CURRENCY_QUOTE_API(e.data)), 5000);
});
