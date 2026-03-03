let chart;

function renderChart(data){
  const labels = Object.keys(data);
  const averages = labels.map(l => data[l].average);

  const ctx = document.getElementById("chart").getContext("2d");

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Điểm trung bình',
        data: averages,
        backgroundColor: '#E91E63'
      }]
    },
    options: {
      responsive: true,
      animation: { duration: 2000 }
    }
  });
}
