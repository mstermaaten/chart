const data = axios.create({ baseURL: "http://api.coindesk.com/v1/bpi/" });
const ctx = document.querySelector("#Chart").getContext("2d");
const button = document.getElementById("button");
const selection = document.getElementById("select");
let chart;

data
  .get("supported-currencies.json")
  .then(data => {
    const info = data.data;

    info.forEach(countryObj => {
      const node = document.createElement("option");
      node.value = countryObj.currency;
      node.innerText = countryObj.country;

      // const textnode = document.createTextNode(`${info[x][1].currency}`);
      // node.appendChild(textnode);
      selection.appendChild(node);
    });

    selection.value = "USD";
    selection.text = "United States Dollar";
  })
  .then(setted => {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    data
      .get(
        `historical/close.json?currency=${selection.value}&start=${start}&end=${end}`
      )
      .then(data => {
        const bpi = data.data.bpi;
        const label = Object.keys(bpi);
        const info = Object.values(bpi);

        chart = new Chart(ctx, {
          // The type of chart we want to create
          type: "line",

          // The data for our dataset
          data: {
            labels: label,
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: info
              }
            ]
          },

          // Configuration options go here
          options: {}
        });
      });
  })
  .catch(error => {
    debugger;
    console.log(error);
  });

const searchValue = () => {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  data
    .get(
      `historical/close.json?currency=${selection.value}&start=${start}&end=${end}`
    )
    .then(data => {
      const bpi = data.data.bpi;
      const newLabel = Object.keys(bpi);
      const newInfo = Object.values(bpi);
      chart.data.labels = newLabel;
      chart.data.datasets.forEach(dataset => {
        dataset.data = newInfo;
      });
      chart.update();
    })
    .catch(error => {
      console.log(error);
    });
};

const valueSelected = () => {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  data
    .get(
      `historical/close.json?currency=${selection.value}&start=${start}&end=${end}`
    )
    .then(data => {
      const bpi = data.data.bpi;
      const newLabel = Object.keys(bpi);
      const newInfo = Object.values(bpi);
      chart.data.labels = newLabel;
      chart.data.datasets.forEach(dataset => {
        dataset.data = newInfo;
      });
      chart.update();
    });
};

button.addEventListener("click", searchValue);
selection.addEventListener("change", valueSelected);
