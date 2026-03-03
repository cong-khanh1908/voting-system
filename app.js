let chart;

function getVoterID() {
  let id = localStorage.getItem("voterID");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("voterID", id);
  }
  return id;
}

function vote() {
  const team = document.getElementById("team").value;
  const score = Number(document.getElementById("score").value);
  const message = document.getElementById("message");

  if (!score || score < 1 || score > 10) {
    message.innerText = "Điểm phải từ 1 đến 10";
    message.className = "text-red-600";
    return;
  }

  fetch(CONFIG.API_URL, {
    method: "POST",
    body: JSON.stringify({
      team: team,
      score: score,
      voter: getVoterID()
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.status === "success") {
      message.innerText = "Bình chọn thành công!";
      message.className = "text-green-600";
      loadResults();
    } else if (data.status === "duplicate") {
      message.innerText = "Bạn đã bình chọn trước đó.";
      message.className = "text-red-600";
    } else if (data.status === "closed") {
      message.innerText = "Đã hết thời gian bình chọn.";
      message.className = "text-red-600";
    }
  });
}

function loadResults() {
  fetch(CONFIG.API_URL)
  .then(r => r.json())
  .then(res => {
    if (res.status !== "ok") return;

    const labels = Object.keys(res.data);
    const values = labels.map(t => res.data[t].average);

    if (chart) chart.destroy();

    chart = new Chart(
      document.getElementById("resultChart"),
      {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Điểm trung bình",
            data: values
          }]
        }
      }
    );
  });
}

function startCountdown() {
  const end = new Date(CONFIG.END_TIME).getTime();
  const el = document.getElementById("countdown");

  setInterval(() => {
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      el.innerText = "ĐÃ KẾT THÚC";
      return;
    }

    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((diff%(1000*60*60))/(1000*60));

    el.innerText = `${d} ngày ${h} giờ ${m} phút`;
  }, 1000);
}

loadResults();
startCountdown();