// document.addEventListener('DOMContentLoaded', function() {
//   console.log('WAR Board Game website loaded successfully.');

//   // window.onscroll = function() {
//   // }
//   var htmlHeader = document.getElementsByTagName('header')[0];
//   console.log(htmlHeader)

//   var parallax = htmlHeader.getElementsByClassName("parallax")[0];
//   console.log(parallax)
//   var mainTitle = htmlHeader.getElementsByClassName("main_title")[0];
//   console.log(mainTitle)

//   parallax.addEventListener('scroll', function() {
//     console.log('parallax---scroll :: ' + parallax.scrollTop)
//     mainTitle.style.boxShadow = `inset 0vh 0vh 10vh ${parallax.scrollTop}vh rgba(18, 26, 45, 1)`;
//   });

// });

document.addEventListener("DOMContentLoaded", function () {
  console.log("WAR Board Game website loaded successfully.");
  window.onscroll = function () {
    document.getElementById(
      "scroller"
    ).innerHTML = `window: '${window.innerWidth} x ${window.innerHeight}' > (X: ${window.scrollX}, Y: ${window.scrollY})`;
  };
  console.log(window);

  const controller = document.getElementById("controller");
  if (controller) {
    // controller.addEventListener("click", function (e) {
    //   // console.log(e);
    //   // e.clientY;
    // });

    let ctrlClicked = false,
      ctrlClickHolded = false;
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
