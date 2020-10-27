const form = document.querySelector("#codef");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  var codefbtn = document.querySelector("#codefbtn");
  codefbtn.className = "button is-link is-loading is-large";

  const fetchurl = "/query?site=codeforces";

  fetch(fetchurl).then((response) => {
    response.json().then((data) => {
      if (data.error) console.log("error");
      else {
        const cftable = document.querySelector("#codeforces");
        var tempdata =
          '<p class="title is-1">CodeForces</p><a href="http://codeforces.com/" target="_blank">Checkout Codeforces</a><br><table class="table is-striped is-hoverable is-fullwidth"><tr><td>ID</td><td>Name</td><td>Start</td><td>End</td></tr>';
        data.map((e) => {
          if (e) {
            var mydate = new Date(e.startTimeSeconds * 1000);
            var mydate1 = new Date(
              (e.startTimeSeconds + e.durationSeconds) * 1000
            );
            tempdata += `<tr><td>${e.id}</td><td>${
              e.name
            }</td><td>${mydate.toGMTString()}</td><td>${mydate1.toGMTString()}</td></tr>`;
          }
        });
        cftable.innerHTML = tempdata + "</table><br>";
        codefbtn.className = "button is-link is-large";
      }
    });
  });
});

const formc = document.querySelector("#codec");

formc.addEventListener("submit", (e) => {
  e.preventDefault();

  var codecbtn = document.querySelector("#codecbtn");
  codecbtn.className = "button is-warning is-loading is-large";

  const fetchurl = "/query?site=codechef";

  fetch(fetchurl).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log("error");
      } else {
        const cctable = document.querySelector("#codechef");
        data.data = data.data.replace(/<a/g, "<ab");
        const d = `<p class="title is-1">CodeChef</p><a href="https://www.codechef.com/" target="_blank" >Checkout Codechef</a><br><table class="table is-striped is-hoverable is-fullwidth"><tr><td>ID</td><td>Name</td><td>START</td><td>END</td></tr>${data.data}</table>`;
        cctable.innerHTML = d;
        codecbtn.className = "button is-warning is-large";
      }
    });
  });
});
