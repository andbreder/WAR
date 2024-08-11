const dataComIntl = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

let exhangeSteps;
let exhangeInfos;
let lotteryInterval;
let lotteryTimeout;

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

  const preambles = document.getElementsByClassName("preamble");
  if (preambles && preambles.length > 0) {
    for (let i = 0; i < preambles.length; i++) {
      const preamble = preambles[i];
      preamble.addEventListener("click", (e) => {
        var synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(preamble.ariaLabel);
        utterance.lang = "pt-BR";
        synth.speak(utterance);
      });
    }
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

  const cannons_chat = document.getElementById("cannons-chat");
  cannons_chat.innerHTML += cannons_chat.innerHTML;

  const tanks_chat = document.getElementById("tanks-chat");
  tanks_chat.innerHTML += tanks_chat.innerHTML;

  const cardsUI = document.getElementsByClassName("cards-ui");
  if (cardsUI) {
    for (let i = 0; i < cardsUI.length; i++) {
      cardsUI[i].addEventListener("click", () => {
        if (cardsUI[i].classList.contains("showing"))
          cardsUI[i].classList.remove("showing")
        else
          cardsUI[i].classList.add("showing")
      });
    }
  }

  setInterval(() => shuffleDice(document.getElementById("dices-red"), "#FE0000"), 3000);
  setInterval(() => shuffleDice(document.getElementById("dices-yellow"), "#FFB400"), 3050);


  const calculator = document.getElementById("calculator");
  const calcClose = document.getElementById("calc-close");

  document.getElementById("dice-calc").addEventListener('click', () => {
    document.documentElement.style.overflow = "hidden";
    calculator.removeAttribute('style');
  });
  calcClose.addEventListener('click', () => {
    document.documentElement.removeAttribute('style');
    calculator.style.display = "none";
  });


  const calcLuckInputAtk = document.getElementById("calc-atk");
  const calcLuckInputDef = document.getElementById("calc-def");
  const calcChallengeRes = document.getElementById("calc-res");
  const calcChallengeLst = document.getElementById("xadow");

  calcLuckInputAtk.addEventListener("change", (e) => InputLuckOnChange(calcLuckInputAtk, calcBtnAtkAdd, calcBtnAtkRem));
  calcLuckInputDef.addEventListener("change", (e) => InputLuckOnChange(calcLuckInputDef, calcBtnDefAdd, calcBtnDefRem));

  function InputLuckOnChange(input, btnAdd, btnRem) {
    btnAdd.disabled = input.value >= input.max;
    if (btnAdd.disabled) input.value = input.max;
    btnRem.disabled = input.value <= input.min;
    if (btnRem.disabled) input.value = input.min;
  }

  const calcBtnAtkAdd = document.getElementById("calc-add-atk");
  const calcBtnAtkRem = document.getElementById("calc-rem-atk");
  const calcBtnDefAdd = document.getElementById("calc-add-def");
  const calcBtnDefRem = document.getElementById("calc-rem-def");

  calcBtnAtkAdd.addEventListener('mousedown', () => { LotteryAdd(calcLuckInputAtk); lotteryTimeout = setTimeout(() => LotteryAddLoop(calcLuckInputAtk), 800); });
  calcBtnAtkAdd.addEventListener('touchstart', () => { LotteryAdd(calcLuckInputAtk); lotteryTimeout = setTimeout(() => LotteryAddLoop(calcLuckInputAtk), 800); });

  calcBtnAtkRem.addEventListener('mousedown', () => { LotteryRem(calcLuckInputAtk); lotteryTimeout = setTimeout(() => LotteryRemLoop(calcLuckInputAtk), 800); });
  calcBtnAtkRem.addEventListener('touchstart', () => { LotteryRem(calcLuckInputAtk); lotteryTimeout = setTimeout(() => LotteryRemLoop(calcLuckInputAtk), 800); });

  calcBtnDefAdd.addEventListener('mousedown', () => { LotteryAdd(calcLuckInputDef); lotteryTimeout = setTimeout(() => LotteryAddLoop(calcLuckInputDef), 800); });
  calcBtnDefAdd.addEventListener('touchstart', () => { LotteryAdd(calcLuckInputDef); lotteryTimeout = setTimeout(() => LotteryAddLoop(calcLuckInputDef), 800); });

  calcBtnDefRem.addEventListener('mousedown', () => { LotteryRem(calcLuckInputDef); lotteryTimeout = setTimeout(() => LotteryRemLoop(calcLuckInputDef), 800); });
  calcBtnDefRem.addEventListener('touchstart', () => { LotteryRem(calcLuckInputDef); lotteryTimeout = setTimeout(() => LotteryRemLoop(calcLuckInputDef), 800); });

  calcBtnAtkAdd.addEventListener('mouseup', () => LotteryEnd(calcLuckInputAtk));
  calcBtnAtkAdd.addEventListener('touchend', () => LotteryEnd(calcLuckInputAtk));

  calcBtnAtkRem.addEventListener('mouseup', () => LotteryEnd(calcLuckInputAtk));
  calcBtnAtkRem.addEventListener('touchend', () => LotteryEnd(calcLuckInputAtk));

  calcBtnDefAdd.addEventListener('mouseup', () => LotteryEnd(calcLuckInputDef));
  calcBtnDefAdd.addEventListener('touchend', () => LotteryEnd(calcLuckInputDef));

  calcBtnDefRem.addEventListener('mouseup', () => LotteryEnd(calcLuckInputDef));
  calcBtnDefRem.addEventListener('touchend', () => LotteryEnd(calcLuckInputDef));

  calcBtnAtkAdd.addEventListener('mouseleave', () => LotteryEnd(calcLuckInputAtk));
  calcBtnAtkRem.addEventListener('mouseleave', () => LotteryEnd(calcLuckInputAtk));
  calcBtnDefAdd.addEventListener('mouseleave', () => LotteryEnd(calcLuckInputDef));
  calcBtnDefRem.addEventListener('mouseleave', () => LotteryEnd(calcLuckInputDef));

  document.getElementById("sorteadeiro").addEventListener('click', () => {
    let troopsATK = calcLuckInputAtk.value;
    let troopsDEF = calcLuckInputDef.value;
    let results = [];

    while (troopsATK > 0 && troopsDEF > 0) {
      results.push({
        atkQtd: troopsATK,
        defQtd: troopsDEF,
        atkDice: RollDice(),
        defDice: RollDice()
      });
      if (results[results.length - 1].atkDice > results[results.length - 1].defDice)
        troopsDEF--;
      else
        troopsATK--;

      if (troopsDEF > 0 && troopsDEF <= 3 && troopsDEF < troopsATK) {
        results.push({
          atkQtd: troopsATK,
          defQtd: troopsDEF,
          atkDice: RollDice(),
          defDice: "🤡"
        });
        troopsDEF--;
      }
    }

    let events = "";
    for (let i = 0; i < results.length; i++) {
      const atk = results[i].atkDice;
      const def = results[i].defDice;
      events +=
        `<div class="event">
          <small class="${def == "🤡" || atk > def ? "win" : ""}">${results[i].atkQtd}</small>
          <span class="${def == "🤡" || atk > def ? "win" : ""}">${atk}</span>
          <span>x</span>
          <span class="${def != "🤡" && def >= atk ? "win" : ""}">${def}</span>
          <small class="${def != "🤡" && def >= atk ? "win" : ""}">${results[i].defQtd}</small>
        </div>`
    }

    var result = document.createElement("div");
    result.classList.add("result");
    result.innerHTML =
      `<p class="sort-date">
        sorteado em ${dataComIntl.format(new Date(Date.now()))}
      </p>
      <hr />
      <div class="content ${troopsATK > troopsDEF ? "atk" : "def"}">
        <div class="icon atk ${troopsATK > troopsDEF ? "" : "off"}">
          <span class="material-symbols-sharp">swords</span>
        </div>
        <div class="summary">
          <div class="atk-count">
            <b>${calcLuckInputAtk.value}</b>
          </div>
          <span class="material-symbols-sharp">arrow_right_alt</span>
          <div class="survivors">
            <b>${troopsATK}</b>
          </div>
          <span style="opacity: 0.5">x</span>
          <div class="survivors">
            <b>${troopsDEF}</b>
          </div>
          <span class="material-symbols-sharp">arrow_left_alt</span>
          <div class="def-count">
            <b>${calcLuckInputDef.value}</b>
          </div>
        </div>
        <div class="icon def ${troopsDEF >= troopsATK ? "" : "off"}">
          <span class="material-symbols-sharp">security</span>
        </div>
      </div>
      <hr />
      <p class="winner">
        <b>${troopsATK > troopsDEF ? "ATAQUE" : "DEFESA"}</b> Venceu!
      </p>
      <hr />
      <div class="events">${events}</div>`;

    calcChallengeRes.insertBefore(result, calcChallengeLst);
    calcChallengeRes.scrollTop = calcChallengeRes.scrollHeight;

    calcLuckInputAtk.value = calcLuckInputAtk.min;
    calcLuckInputAtk.dispatchEvent(CHANGE_EVENT);
    calcLuckInputDef.value = calcLuckInputDef.min;
    calcLuckInputDef.dispatchEvent(CHANGE_EVENT);
  });

  getGit();

});

const positionsDicesCol = ["-012.5vh", "-034.4vh", "-056.2vh", "-078.0vh", "-099.2vh", "-121.0vh", "-142.7vh", "-164.6vh"];
const positionsDicesRow = ["-10.7vh", "-31.7vh", "-53.7vh"];

function shuffleDice(container, bg) {
  const dices = container.getElementsByTagName("img")[0];
  container.style.background = bg;
  setTimeout(() => {
    dices.style.opacity = 0;
    dices.style.left = positionsDicesCol[Math.floor(Math.random() * positionsDicesCol.length)];
    dices.style.top = positionsDicesRow[Math.floor(Math.random() * positionsDicesRow.length)];
    setTimeout(() => {
      container.style.background = bg + "30";
      dices.style.opacity = 1;
    }, 50);
  }, 50);
}

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
          <img src="assets/github-mark-icon.png" aria-label="GitHub Logo" height="32">
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

function RollDice() {
  // return Math.floor((Math.sin(Date.now() + Math.random()) * 10000) % 6) + 1;
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return (array[0] % 6) + 1;
}

function LotteryAdd(input) {
  const n = parseInt(input.value) + 1;
  input.value = n > input.max ? input.max : n;
}
function LotteryRem(input) {
  const n = parseInt(input.value) - 1;
  input.value = n < input.min ? input.min : n;
}

function LotteryAddLoop(input) { lotteryInterval = setInterval(() => LotteryAdd(input), 50); }
function LotteryRemLoop(input) { lotteryInterval = setInterval(() => LotteryRem(input), 50); }

const CHANGE_EVENT = new Event('change');
function LotteryEnd(input) {
  input.dispatchEvent(CHANGE_EVENT);
  clearTimeout(lotteryTimeout);
  clearInterval(lotteryInterval);
}