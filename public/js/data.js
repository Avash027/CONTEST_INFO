const plotForm = document.getElementById("plotForm");

plotForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userName = document.getElementById("userName").value;

  const fetchUrl = "/query?site=codefordata&name=" + userName;

  fetch(fetchUrl).then((response) => {
    response.json().then(({ rating, date,error}) => {
      if (error==='error') {
          document.getElementById('graph').innerHTML='<div class="notification is-danger" align="center"><strong>No username found</strong> in codeforces archive</div>'
      } else {
          document.getElementById('graph').innerHTML=''
        var trace = {
          x: date,
          y: rating,
          name: userName,
          type: "scatter",
        };

        var data = [trace];
        Plotly.newPlot("graph", data);
      }
    });
  });
});
