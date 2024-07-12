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

    let titleIndex = 0;
    let subtitleIndex = 0;

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];

      if (title.classList.contains("sub")) {
        ++subtitleIndex;
      } else {
        ++titleIndex;
        subtitleIndex = 0;
      }

      var option = document.createElement("div");
      option.classList.add("option", "md-ripples");
      if (title.classList.contains("sub")) option.classList.add("sub");

      let prefixNum = `${titleIndex}.${subtitleIndex > 0 ? subtitleIndex + "." : ""
        }`;
      option.innerText = `${prefixNum} ${title.innerText}`;
      title.innerText = `${prefixNum} ${title.innerText}`;

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
      console.log(btnMenuChapters.children);
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

  document.querySelectorAll('.frontiers-list-container > p > b').forEach((el, i) => {
    el.innerText = `${String(i+1).padStart(2, '0')}. ${el.innerText}`
  });
});

function scrollMeTo(id) {
  console.log("scrollMeTo :: " + id);

  var element = document.getElementById(id);

  console.log(element);

  if (element != null)
    window.scroll({
      top: element.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth"
    });
}
