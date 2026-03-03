const params = new URLSearchParams(window.location.search);
if(params.get("key") !== "1908"){
  document.body.innerHTML = "<h2>Access Denied</h2>";
}

fetch(CONFIG.API_URL)
  .then(res=>res.json())
  .then(data=>{
    let html = "<table class='table table-bordered'><tr><th>Thí sinh</th><th>Điểm TB</th><th>Lượt vote</th></tr>";

    Object.keys(data.data).forEach(team=>{
      html += `<tr>
        <td>${team}</td>
        <td>${data.data[team].average}</td>
        <td>${data.data[team].votes}</td>
      </tr>`;
    });

    html += "</table>";
    document.getElementById("adminData").innerHTML = html;
  });
