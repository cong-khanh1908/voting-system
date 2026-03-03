const API_URL = CONFIG.API_URL;
const END_TIME = new Date(CONFIG.END_TIME);

let votingClosed = false;

/* ==========================
   COUNTDOWN + AUTO LOCK
========================== */
function updateCountdown() {
  const now = new Date();
  const diff = END_TIME - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "⛔ ĐÃ KẾT THÚC BÌNH CHỌN";
    votingClosed = true;
    return;
  }

  const h = Math.floor(diff / (1000*60*60));
  const m = Math.floor((diff%(1000*60*60))/(1000*60));
  const s = Math.floor((diff%(1000*60))/1000);

  document.getElementById("countdown").innerHTML =
    `⏳ Còn lại: ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown,1000);
updateCountdown();

/* ==========================
   SUBMIT VOTE
========================== */
function submitVote(){
  if(votingClosed){
    alert("Đã hết thời gian bình chọn!");
    return;
  }

  const team = document.getElementById("team").value;
  const score = document.getElementById("score").value;
  const voter = document.getElementById("voter").value;

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({team,score,voter})
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status==="success"){
      alert("Bình chọn thành công!");
      loadResults();
    }else{
      alert("Lỗi: "+data.status);
    }
  });
}

/* ==========================
   LOAD RESULTS
========================== */
function loadResults(){
  fetch(API_URL)
  .then(res=>res.json())
  .then(data=>{
    if(data.status==="ok"){
      renderTop3(data.data);
      renderChart(data.data);
    }
  });
}

/* ==========================
   TOP 3 + FIREWORKS
========================== */
function renderTop3(data){
  const teams = Object.keys(data).map(t=>({
    name:t,
    avg:parseFloat(data[t].average),
    votes:data[t].votes
  })).sort((a,b)=>b.avg-a.avg).slice(0,3);

  const container = document.getElementById("top3");
  container.innerHTML="";

  const medals=["🥇","🥈","🥉"];

  teams.forEach((t,i)=>{
    container.innerHTML+=`
      <div class="col-md-4 mb-3">
        <div class="card medal-${i}">
          <div class="card-body">
            <h2>${medals[i]}</h2>
            <h5>${t.name}</h5>
            <p>⭐ ${t.avg}</p>
            <p>${t.votes} lượt vote</p>
          </div>
        </div>
      </div>
    `;
  });

  if(teams.length>0){
    launchFireworks();
  }
}

/* ==========================
   FIREWORKS EFFECT
========================== */
function launchFireworks(){
  confetti({
    particleCount:200,
    spread:120,
    origin:{y:0.6}
  });
}

/* ==========================
   CHART
========================== */
let chart;
function renderChart(data){
  const labels=Object.keys(data);
  const values=labels.map(l=>parseFloat(data[l].average));

  const ctx=document.getElementById("chart");

  if(chart) chart.destroy();

  chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels,
      datasets:[{
        label:"Điểm trung bình",
        data:values
      }]
    }
  });
}

loadResults();
