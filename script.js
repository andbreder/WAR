document.addEventListener("DOMContentLoaded", function () {
  console.log("WAR Board Game website loaded successfully.");

  const divMenuChapters = document.getElementById("menu-chapters-containers");
  const btnMenuChapters = document.getElementById("menu-chapters");
  btnMenuChapters.style.transform = `scale(${btnMenuChaptersStateNum()})`;
  btnMenuChapters.style.opacity = `${btnMenuChaptersStateNum()}`;
  btnMenuChapters.addEventListener("click", (e) => {
    if (btnMenuChaptersStateNum() < 1) {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });btnMenuChapters
    } else {
      console.log(btnMenuChapters.children)
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

  window.onscroll = function () {
    document.getElementById(
      "scroller"
    ).innerHTML = `window: '${window.innerWidth} x ${window.innerHeight}' > (X: ${window.scrollX}, Y: ${window.scrollY})`;

    btnMenuChapters.style.transform = `scale(${btnMenuChaptersStateNum()})`;
    btnMenuChapters.style.opacity = `${btnMenuChaptersStateNum()}`;
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
