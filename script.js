const graphicContainerElement = document.querySelector(".graphic-container");
const containerElement = document.querySelector(".container");
const loaderElement = document.querySelector(".loader");
const graphicElement = document.getElementById("graphic");
const dateElement = document.querySelector(".date");
const exchangeRateElement = document.querySelector(".exchange-rate");
const exchangeCurrencyElement = document.querySelector(".exchange-currency");
const select1Element = document.querySelector(".select-1");
const select2Element = document.querySelector(".select-2");
const inputField1 = document.querySelector(
  ".input-container:nth-child(1) .input-field"
);
const inputField2 = document.querySelector(
  ".input-container:nth-child(2) .input-field"
);
let select1Value = select1Element.value;
let select2Value = select2Element.value;

let PARAMS = `${select1Element.value}-${select2Element.value}`;

const graphicChart = new Chart(graphicElement, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  },
  options: {
    scales: {
      y: {
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  },
});

function preRender() {
  graphicContainerElement.setAttribute("class", "graphic-container");
  containerElement.setAttribute("class", "container");
  loaderElement.setAttribute("class", "none");
}

function handleExchangeCurrency(name, rate) {
  const [currentName] = name?.split("/");
  exchangeCurrencyElement.textContent = `${rate} ${currentName} igual a`;
  window.localStorage.setItem(
    "ExchangeCurrency",
    JSON.stringify({ name: "Dólar Americano/", rate: 1 })
  );
}

function handleExchangeRate(name, rate) {
  const [, currentName] = name?.split("/");
  const newRate = Number(rate).toFixed(2).toString().replace(".", ",");
  exchangeRateElement.textContent = `${newRate} ${currentName}`;

  window.localStorage.setItem(
    "ExchangeRate",
    JSON.stringify({ name: "/Real Brasileiro", rate })
  );
}

function handleDate(date) {
  dateElement.textContent = date;
  window.localStorage.setItem("Date", date);
}

function handleGraphicChart(currencyQuote) {
  const [currentName] = currencyQuote?.name?.split("/");
  graphicChart.data.labels.push(currencyQuote?.hoursAndSeconds);
  graphicChart.data.datasets.forEach((currentDataset) => {
    currentDataset.label = currentName;
    currentDataset.data.push(currencyQuote?.ask);

    if (currencyQuote.data && currencyQuote.data.length >= 5) {
      currentDataset.data.shift();
    }
  });

  if (graphicChart?.data?.labels.length >= 7) {
    graphicChart?.data?.labels.shift();
    graphicChart?.data?.labels.shift();
  }

  graphicChart.update();
}

function resetGraphic() {
  graphicChart.data = {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderWidth: 1,
      },
    ],
  };
}

function reset() {
  resetGraphic();
  workApi = new Worker("./works/api.js");
  workApi.postMessage(PARAMS);
  render();
}

let workApi = new Worker("./works/api.js");

workApi.postMessage(PARAMS);
render();

function render() {
  workApi.addEventListener("message", (e) => {
    const currencyQuote = e.data;
    window.localStorage.setItem("Ask", currencyQuote.ask);
    handleDate(currencyQuote.date);
    handleExchangeCurrency(currencyQuote.name, 1);
    handleExchangeRate(currencyQuote.name, currencyQuote.ask);
    handleGraphicChart(currencyQuote);
  });
}

let workerConversor = new Worker("./works/conversao.js");
workerConversor.postMessage(PARAMS);

workerConversor.addEventListener("message", (event) => {
  preRender();
  const quote = event.data;
  const askStorage = window.localStorage.getItem("Ask");
  inputField1.addEventListener("input", (e) => {
    const value = e.target.value;
    if (askStorage && !isNaN(value)) {
      inputField2.value = (Number(value) * Number(askStorage)).toFixed(2);
    }
    if (!isNaN(value)) {
      inputField2.value =
        value === "" ? "" : (Number(value) * quote).toFixed(2);
    }
  });
  inputField2.addEventListener("input", (e) => {
    const value = e.target.value;
    if (askStorage && !isNaN(value)) {
      inputField1.value = (Number(value) * Number(askStorage)).toFixed(2);
    }

    if (!isNaN(value)) {
      inputField1.value =
        value === "" ? "" : (Number(value) * quote).toFixed(2);
    }
  });
});

function resetAsk() {
  workerConversor = new Worker("./works/conversao.js");
  workerConversor.postMessage(PARAMS);
  workerConversor.addEventListener("message", (event) => {
    const quote = event.data;
    const askStorage = window.localStorage.getItem("Ask");
    inputField1.addEventListener("input", (e) => {
      const value = e.target.value;
      if (askStorage && !isNaN(value)) {
        inputField2.value = (Number(value) * Number(askStorage)).toFixed(2);
      }
      if (!isNaN(value)) {
        inputField2.value =
          value === "" ? "" : (Number(value) * quote).toFixed(2);
      }
    });
    inputField2.addEventListener("input", (e) => {
      const value = e.target.value;
      if (askStorage && !isNaN(value)) {
        inputField1.value = (Number(value) * Number(askStorage)).toFixed(2);
      }

      if (!isNaN(value)) {
        inputField1.value =
          value === "" ? "" : (Number(value) * quote).toFixed(2);
      }
    });
  });
}

// CSS
select1Element.addEventListener("focus", () => {
  inputField1.classList.add("focused");
});

select1Element.addEventListener("blur", () => {
  inputField1.classList.remove("focused");
});

select2Element.addEventListener("focus", () => {
  inputField2.classList.add("focused");
});

select2Element.addEventListener("blur", () => {
  inputField2.classList.remove("focused");
});

// select interação
select1Element.addEventListener("change", (e) => {
  workApi.terminate();
  workerConversor.terminate();
  PARAMS = `${e.target.value}-${select2Value}`;
  select1Value = e.target.value;
  resetAsk();
  reset();
});

select2Element.addEventListener("change", (e) => {
  workApi.terminate();
  workerConversor.terminate();
  PARAMS = `${select1Value}-${e.target.value}`;
  select2Value = e.target.value;
  resetAsk();
  reset();
});
