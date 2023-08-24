import { generateDate, generateHoursAndSeconds } from "../util/generateDate.js";
import apiWorker from "../works/api.worker.js";
import conversaoWorker from "../works/conversao.worker.js";
export class WorkerService {
  constructor() {
    this.api = new apiWorker();
    this.conversor = new conversaoWorker();
    this.asks = new Map();
    this.currentMoney = new Map();
  }
  apiPostMessage(currencyQuote) {
    this.api.postMessage(currencyQuote);
  }
  conversorPostMessage(currencyQuote) {
    this.conversor.postMessage(currencyQuote);
  }
  apiEvent(HOC) {
    this.api.addEventListener("message", (e) => {
      this.asks.set(e.data.ask.id, e.data.ask.value);
      HOC(e);
    });
  }
  kill() {
    this.api.terminate();
  }
  conversorEvent(currencyQuote) {
    this.conversor.postMessage(currencyQuote);
  }
}
