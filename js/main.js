//Smooth link bookmark
//Cach 1:
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//   anchor.addEventListener('click', function(e) {
//     e.preventDefault();

//     document.querySelector(this.getAttribute('href')).scrollIntoView({
//       behavior: 'smooth'
//     });

//     // console.log(anchor.offset().top);
//     console.log($('html, body').scrollTop()) ;
//   });
// });
var $root = $("html, body");

$('a[href^="#"]').click(function (e) {
  e.preventDefault();
  let distance = $($.attr(this, "href")).offset().top - 99;
  // console.log(this.parent);

  $root.animate(
    {
      scrollTop: distance,
    },
    700
  );
  return false;
});

function changeBgNav(color) {
  $(".header-nav").css("background-color", color);
}
// get all nav-item of navbar
const listNavItem = document.querySelectorAll("#navbarCollapse .nav-item");

function clearActiveNavItem() {
  listNavItem.forEach((navItem) => {
    navItem.classList.remove("active");
  });
}

// progress when window scroll down and up
$(document).scroll(function () {
  let disScrollTop = $(document).scrollTop();
  let heightNav = $(".header-nav").innerHeight();
  let distanceOfAbout = $("#about").offset().top - 100;
  let distanceOfPort = $("#portfolio").offset().top - 100;
  let distanceOfBlog = $("#blog").offset().top - 100;
  let distanceOfContact = $("#contact").offset().top - 100;
  if (disScrollTop > heightNav) {
    changeBgNav("white");
    $("#navbarCollapse span").addClass("change-to-black");
  } else {
    changeBgNav("transparent");
    $("#navbarCollapse span").removeClass("change-to-black");
  }

  clearActiveNavItem();
  if (disScrollTop >= distanceOfContact) {
    listNavItem[4].classList.add("active");
  } else if (disScrollTop >= distanceOfBlog) {
    listNavItem[3].classList.add("active");
  } else if (disScrollTop >= distanceOfPort) {
    listNavItem[2].classList.add("active");
  } else if (disScrollTop >= distanceOfAbout) {
    listNavItem[1].classList.add("active");
  } else {
    listNavItem[0].classList.add("active");
  }
});

// progress portfolio
// show portfolio
function showPort(strPort) {
  if (strPort === "Show All") {
    listPort.forEach((port) => {
      port.classList.remove("hide-port");
    });
  } else {
    listPort.forEach((port) => {
      if (!port.classList.contains(strPort)) {
        port.classList.add("hide-port");
      } else {
        port.classList.remove("hide-port");
      }
      // console.log(port.classList);
    });
  }
}

// get all figure in portfolio
const listPort = document.querySelectorAll(".portfolioContainer figure");
// catch event change portfolio
var listStrPort = ["design", "brand", "photo"];
var iOldActive = 0;

var indexDetail = -1;
const listNavPort = document.querySelectorAll("#portfolio .nav-link");

function showDetailPort(i) {
  // console.log(listPort[i].children[0].getAttribute("src"));
  let childrensPort = listPort[i].children;
  $("#detailPortfolio .details__img").attr(
    "src",
    childrensPort[0].getAttribute("src")
  );
  $("#detailPortfolio .details__name").text(childrensPort[3].textContent);
  $("#detailPortfolio .details__number").text(i + 1 + " / " + listPort.length);
  // set width of details__text = width of img
  // phai show detail len roi ms lay width neu ko se = 0
  $(".details__text").width($(".details__img").width());
}

listNavPort.forEach(function (anchor, index) {
  anchor.addEventListener("click", (e) => {
    listNavPort[iOldActive].classList.remove("active");
    anchor.classList.add("active");
    iOldActive = index;
    if (index === 0) {
      showPort("Show All");
    } else {
      showPort(listStrPort[index - 1]);
    }
  });
});

listPort.forEach((port, index) => {
  port.addEventListener("click", function () {
    indexDetail = index;

    // show detailPortfolio
    $("#detailPortfolio").show();

    showDetailPort(index);
  });
});

// close detailPortfolio
$("#detailPortfolio .close").click(() => {
  $("#detailPortfolio").hide();
});

// prev and next detailsPort
function onChangeDetailsPort(i) {
  indexDetail += i;
  if (indexDetail < 0 || indexDetail >= listPort.length) {
    indexDetail -= i * listPort.length;
  }
  showDetailPort(indexDetail);
}
