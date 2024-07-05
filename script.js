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
    var el = document.getElementsByClassName("button_centralizer")[0];

    if (window.scrollY == 0) {
      el.classList.remove("off");
      document.getElementById('btn_right').innerHTML ='COMESSA'
    } else {
      el.classList.add("off");
      document.getElementById('btn_right').innerHTML ='X'
    }
  };
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
