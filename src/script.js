import { Graphics } from "./graphics/Graphics.js";
import { combinations } from "./util/currencys.js";
import apiWorker from "./works/api.worker.js";
import conversaoWorker from "./works/conversao.worker.js";
import "./style.css";
import { WorkerService } from "./service/WorkerService.js";
const graphicContainerElement = document.querySelector(".graphic-container");
const containerElement = document.querySelector(".container");
const loaderElement = document.querySelector(".loader");
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

combinations.forEach((currencyQuote, i) => {
  const worker = new WorkerService();
  worker.apiPostMessage(currencyQuote);

  const div = document.createElement("div");
  const canvaElement = document.createElement("canvas");
  const chart = new Graphics(canvaElement);
  div.appendChild(canvaElement);
  div.setAttribute("id", currencyQuote);
  div.setAttribute("class", "chart");

  graphicContainerElement.appendChild(div);

  worker.apiEvent((e) => {
    const id = `${select1Element.value}-${select2Element.value}`;
    inputField1.addEventListener("input", (inputEvent) => {
      if (inputEvent.target.value === "") {
        inputField2.value = "";
      } else if (worker.asks.get(id)) {
        inputField2.value =
          Number(worker.asks.get(id)) * Number(inputEvent.target.value);
      }
    });

    inputField2.addEventListener("input", (inputEvent) => {
      if (inputEvent.target.value === "") {
        inputField1.value = "";
      } else if (worker.asks.get(id)) {
        inputField1.value =
          Number(worker.asks.get(id)) * Number(inputEvent.target.value);
      }
    });

    if (i === combinations.length - 1) {
      graphicContainerElement.setAttribute("class", "graphic-container");
      containerElement.setAttribute("class", "container");
      loaderElement.setAttribute("class", "loader none");
    }

    dateElement.textContent = e.data.date;
    chart.push(e.data);
  });

  if (i !== 0) {
    div.setAttribute("class", "none");
  }
});

const updateChartDisplay = (value) => {
  const chartSelect = document.getElementById(value);
  const chartCurrenty = document.querySelector(`.chart`);

  chartCurrenty?.setAttribute("class", "none");
  chartSelect?.setAttribute("class", "chart");
};

select1Element.addEventListener("input", (e) => {
  const value = `${e.target.value}-${select2Element.value}`;
  updateChartDisplay(value);
});

select2Element.addEventListener("input", (e) => {
  const value = `${select1Element.value}-${e.target.value}`;
  updateChartDisplay(value);
});

// css
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
