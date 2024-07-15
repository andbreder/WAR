document.addEventListener("DOMContentLoaded", function () {
  const divMenuChapters = document.getElementById("menu-chapters-containers");
  const btnMenuChapters = document.getElementById("menu-chapters");

  ///
  /// carrega opcoes no menu
  ///

  let titles = document
    .getElementById("id-main")
    .getElementsByClassName("title");
  if (titles) {
    var options = document.createElement("div");
    options.classList.add("options");
    divMenuChapters.prepend(options);

    let titleIndex_level0 = 0;
    let titleIndex_Level1 = 0;
    let titleIndex_Level2 = 0;
    let titleIndex_Level3 = 0;

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];

      switch (title.dataset.level) {
        case '1':
          ++titleIndex_Level1;
          titleIndex_Level2 = 0;
          titleIndex_Level3 = 0;
          break;
        case '2':
          ++titleIndex_Level2;
          titleIndex_Level3 = 0;
          break;
        case '3':
          ++titleIndex_Level3;
          break;
        default:
          ++titleIndex_level0;
          titleIndex_Level1 = 0;
          titleIndex_Level2 = 0;
          titleIndex_Level3 = 0;
          break;
      }

      var option = document.createElement("div");
      option.classList.add("option", "md-ripples");
      if (title.dataset.level) option.classList.add(`level${title.dataset.level}`);

      let prefix0 = `${titleIndex_level0}.`;
      let prefix1 = titleIndex_Level1 == 0 ? "" : `${titleIndex_Level1}.`;
      let prefix2 = titleIndex_Level2 == 0 ? "" : `${titleIndex_Level2}.`;
      let prefix3 = titleIndex_Level3 == 0 ? "" : `${titleIndex_Level3}.`;

      option.innerText = `${prefix0 + prefix1 + prefix2 + prefix3} ${title.innerText}`;
      title.innerText = `${prefix0 + prefix1 + prefix2 + prefix3} ${title.innerText}`;

      var icon = document.createElement("span");
      icon.classList = "material-symbols-sharp";
      icon.innerText = "read_more";
      option.append(icon);

      options.append(option);

      option.addEventListener("click", (e) => {
        window.scrollTo({
          top: title.getBoundingClientRect().top + window.scrollY,
          behavior: "smooth"
        });
        btnMenuChapters.click();
      });
    }
  }

  btnMenuChapters.style.transform = `scale(${btnMenuChaptersStateNum()})`;
  btnMenuChapters.style.opacity = `${btnMenuChaptersStateNum()}`;
  btnMenuChapters.addEventListener("click", (e) => {
    if (btnMenuChaptersStateNum() < 1) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    } else {
      divMenuChapters.classList.toggle("hide");
      btnMenuChapters.children[0].innerHTML =
        divMenuChapters.classList.contains("hide")
          ? "format_list_numbered"
          : "south_east";
      document
        .getElementsByTagName("html")[0]
        .setAttribute(
          "class",
          divMenuChapters.classList.contains("hide") ? "" : "no-scroll"
        );
    }
  });

  function btnMenuChaptersStateNum() {
    return Math.min(1, window.scrollY / window.innerHeight);
  }

  let scroller = document.getElementById("scroller");

  window.onscroll = function () {
    if (scroller)
      scroller.innerHTML = `window: '${window.innerWidth} x ${window.innerHeight}' > (X: ${window.scrollX}, Y: ${window.scrollY})`;

    btnMenuChapters.style.transform = `scale(${btnMenuChaptersStateNum()})`;
    btnMenuChapters.style.opacity = `${btnMenuChaptersStateNum()}`;
    btnMenuChapters.disabled = window.scrollY <= window.innerHeight;
  };

  const preamble = document.getElementsByClassName("preamble")[0];
  if (preamble) {
    preamble.addEventListener("click", (e) => {
      var synth = window.speechSynthesis;
      var utterance = new SpeechSynthesisUtterance(preamble.ariaLabel);
      utterance.lang = "pt-BR";
      synth.speak(utterance);
    });
  }

  const controller = document.getElementById("controller");
  if (controller) {
    let ctrlClicked = false;
    let ctrlClickHolded = false;
    let ctrlMouseDownLocation = { x: 0, y: 0 };

    let ctrlClickHoldedTimer;

    controller.addEventListener("mousedown", (e) => {
      ctrlClicked = true;
      ctrlMouseDownLocation = { x: e.clientX, y: e.clientY };
      ctrlClickHoldedTimer = setTimeout(() => {
        ctrlClickHolded = true;
      }, 300);
    });

    controller.addEventListener("mouseup", (e) => {
      clearTimeout(ctrlClickHoldedTimer);
      if (ctrlClicked) {
        ctrlClicked = false;
        if (ctrlClickHolded) {
          ctrlClickHolded = false;
          let draggedX =
            Math.abs(ctrlMouseDownLocation.x - e.clientX) >
            window.innerWidth / 2;
          let draggedY =
            Math.abs(ctrlMouseDownLocation.y - e.clientY) >
            window.innerHeight / 5;
          if (draggedX && draggedY) {
            console.log("LIMPOU A TELA!");
          } else if (draggedX) {
            console.log("TEM NADA PRO LADO");
          } else if (draggedY) {
            console.log("TU QUERIA MINIMIZAR? É iPHONE?");
          } else {
            console.log("SEGUROU");
          }
        } else {
          console.log("CLICOU QUE NEM GENTE");
        }
      }
    });
  }

  const frontier_euro_fran = document.getElementById("frontier-euro-fran");
  const frontier_euro_polo = document.getElementById("frontier-euro-polo");
  const frontier_afri_arge = document.getElementById("frontier-afri-arge");
  const frontier_afri_egit = document.getElementById("frontier-afri-egit");
  const frontier_afri_suda = document.getElementById("frontier-afri-suda");
  const frontier_asia_orie = document.getElementById("frontier-asia-orie");
  const frontiers = [
    frontier_afri_arge,
    frontier_euro_fran,
    frontier_euro_polo,
    frontier_asia_orie,
    frontier_afri_suda
  ]
  const frontier_symbols = frontier_afri_egit.getElementsByClassName("material-symbols-sharp");
  let frontier_current_index = 0;
  setInterval(function () {
    for (let i = 0; i < frontiers.length; i++) {
      frontiers[i].style.opacity = "0.1";
      if (!frontier_symbols[i].classList.contains("display-none"))
        frontier_symbols[i].classList.add("display-none");
    }
    frontier_symbols[frontier_current_index].classList.remove("display-none");
    frontiers[frontier_current_index].style.opacity = "1";
    if (++frontier_current_index >= frontiers.length)
      frontier_current_index = 0;
  }, 5000);

  document.querySelectorAll(".frontiers-list-container > p > b").forEach((el, i) => {
    el.innerText = `${String(i + 1).padStart(2, '0')}. ${el.innerText}`
  });

  document.querySelectorAll(".ordered-frontiers-list").forEach((line, i) => {
    let territories = line.innerText.split(',').map(e => e.trim());
    line.innerHTML = "";
    for (let i = 0; i < territories.length; i++) {
      const span = document.createElement("span");
      line.append(span);
      span.innerHTML = territories[i];
      span.addEventListener("click", () => {
        const name = territories[i];
        document.querySelectorAll(".ordered-frontiers-list").forEach((el, i) => {
          el.querySelectorAll("span").forEach(e => {
            e.classList.remove("highlight");
            if (e.innerText == name) {
              e.classList.add("highlight");
            }
          });
        });
      });
    }
  });

  const granades_chat = document.getElementById("granades-chat");
  granades_chat.innerHTML += granades_chat.innerHTML;

  const cannon_chat = document.getElementById("cannon-chat");
  cannon_chat.innerHTML += cannon_chat.innerHTML;

  getGit();
});

function scrollMeTo(id) {
  var element = document.getElementById(id);
  if (element != null)
    window.scroll({
      top: element.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });
}

async function getGit() {
  
  const github = document.getElementById("github");
  if (github) {

    var apiGitUser, apiGitRepo, apiGitBranches;

    apiGitUser = await fetch("https://api.github.com/users/andbreder").then(resp => resp.json());
    if (!apiGitUser) return;

    apiGitRepo = await fetch(apiGitUser.repos_url).then(resp => resp.json());
    apiGitRepo = apiGitRepo.find(item => item.name === "WAR");
    if (!apiGitRepo) return;

    apiGitBranches = await fetch(apiGitRepo.branches_url.split('{')[0]).then(resp => resp.json());
    if (!apiGitBranches) return;

    let date = new Date(apiGitRepo.updated_at);
    let dd = String(date.getDate()).padStart(2, '0');
    let MM = String(date.getMonth() + 1).padStart(2, '0');
    let yy = date.getFullYear();
    let HH = String(date.getHours()).padStart(2, '0');
    let mm = String(date.getMinutes()).padStart(2, '0');

    github.innerHTML = `
      <div class="header">
        <a class="github-logo" href="${apiGitUser.html_url}" aria-label="github/@andbreder">
          <img src="assets/github-mark-white.png" aria-label="GitHub Logo" height="32">
        </a>
        <b>
          ${apiGitUser.login}
        </b>
        <a class="link-war" href="${apiGitUser.html_url}/WAR" aria-label="github/@andbreder/WAR">
          /WAR
        </a>
      </div>
      <div class="user-info">
        <div>
          <img alt="${apiGitUser.name}/${apiGitUser.login}" src="${apiGitUser.avatar_url}" class="avatar">
        </div>
        <div>
          <p class="name">${apiGitUser.name}</p>
          <p class="login">${apiGitUser.login}</p>
          <p class="bio">${apiGitUser.bio}</p>
          <p class="social">
            <span class="material-symbols-sharp">group</span>
            <a href="${apiGitUser.followers_url}">
              <span class="followers">${apiGitUser.followers}</span> followers
            </a>
            <b> · </b>
            <a href="${apiGitUser.following_url}">
              <span class="followers">${apiGitUser.following}</span> following
            </a>
          </p>
          <p class="mail">
            <span class="material-symbols-sharp">mail</span>
            <a href="mailto:${apiGitUser.login}@gmail.com">
              ${apiGitUser.login}@gmail.com
            </a>
          </p>
          <p class="repos">
            <span class="material-symbols-sharp">folder_data</span>
            <a href="${apiGitUser.html_url}/repos">
              <span>${apiGitUser.public_repos}</span> repositories
            </a>
          </p>
        </div>
      </div>
      <hr style="margin: 0 0 1em 1em; width: calc(100% - 2em);"/>
      <div class="war-info">
        <p><span>last updated on</span> <b class="color-green">${HH}:${mm} ${dd}/${MM}/${yy}</b></p>
        <p>
          <span>branches</span> ${apiGitBranches.length} 
          <b> · </b>
          <span>license</span> ${apiGitRepo.license.spdx_id}
        </p>
      </div>
      `;
  }
}