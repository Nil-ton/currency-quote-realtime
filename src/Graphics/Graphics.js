export class Graphics {
  constructor(context) {
    this.chart = new Chart(context, {
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
  }
  reset() {
    this.chart.data = {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
        },
      ],
    };
  }

  push(data) {
    if (!data.name) return;
    const [currentName] = data?.name?.split("/");
    this.chart.data.labels.push(data?.hoursAndSeconds);
    this.chart.data.datasets.forEach((currentDataset) => {
      currentDataset.label = currentName;
      currentDataset.data.push(data?.ask.value);
    });

    if (this.chart.data.datasets[0].data.length > 5) {
      this.chart.data.datasets[0].data.shift();
      this.chart.data.labels.shift();
    }

    this.chart.update();
  }
}
