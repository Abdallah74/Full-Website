const scroller = document.querySelector(".scroller");
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  scroller.style.width = `${(scrollTop / height) * 100}%`;
});

const up = document.querySelector(".top");
window.addEventListener("scroll", () => {
  this.scrollY >= 180 ? up.classList.add("show") : up.classList.remove("show");
});

up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
/* --------------------------- SCROLLER --------------------------- */

/* --------------------------- SETTINGS --------------------------- */
function handleActiveStatus(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
}

const mainColor = localStorage.getItem("color_options");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

let bgOption = true,
  bgInterval,
  localBg = localStorage.getItem("bg-options");

if (localBg !== null) {
  localBg === "true" ? (bgOption = true) : (bgOption = false);
  document.querySelectorAll(".random-bg span").forEach((span) => {
    span.classList.remove("active");
  });
  localBg === "true"
    ? document.querySelector(".random-bg .yes").classList.add("active")
    : document.querySelector(".random-bg .no").classList.add("active");
}

document.querySelector(".settings-box .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("clicked");
};

document.querySelectorAll(".colors-list li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_options", e.target.dataset.color);
    handleActiveStatus(e);
  });
});

document.querySelectorAll(".random-bg span").forEach((span) => {
  span.addEventListener("click", (random) => {
    handleActiveStatus(random);
    if (random.target.dataset.bg === "yes") {
      bgOption === true;
      randomizeImgs();
      localStorage.setItem("bg-options", true);
    } else {
      bgOption === false;
      clearInterval(bgInterval);
      localStorage.setItem("bg-options", false);
    }
  });
});

const bults = document.querySelectorAll(".nav-bults .bult");
const links = document.querySelectorAll(".header .links li a");
function scroll_To(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scroll_To(bults);
scroll_To(links);

const bultsContainer = document.querySelector(".nav-bults");
let bultOption = true,
  localBult = localStorage.getItem("bults-options");

if (localBult !== null) {
  localBult === "true" ? (bultOption = true) : (bultOption = false);
  document.querySelectorAll(".show-bults span").forEach((span) => {
    span.classList.remove("active");
  });
  if (localBult === "true") {
    bultsContainer.style.right = "0";
    document.querySelector(".show-bults .yes").classList.add("active");
  } else {
    bultsContainer.style.right = "-40px";
    document.querySelector(".show-bults .no").classList.add("active");
  }
}

document.querySelectorAll(".show-bults span").forEach((bult) => {
  bult.addEventListener("click", (e) => {
    if (bult.dataset.display === "show") {
      bultsContainer.style.right = "0";
      localStorage.setItem("bults-options", true);
    } else {
      bultsContainer.style.right = "-40px";
      localStorage.setItem("bults-options", false);
    }
    handleActiveStatus(e);
  });
});

document.querySelector(".settings-box .reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
/* --------------------------- SETTINGS --------------------------- */

/* ---------------------- CHANGE BACKGROUND RANDOMLY ---------------------- */
const landing = document.querySelector(".landing"),
  imgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImgs() {
  if (bgOption === true) {
    bgInterval = setInterval(() => {
      const randomImg = Math.floor(Math.random() * imgs.length);
      landing.style.cssText = `background-image:url("images/${imgs[randomImg]}");`;
    }, 10000);
  }
}
randomizeImgs();
/* ---------------------- CHANGE BACKGROUND RANDOMLY ---------------------- */

/* ---------------------- OUR SKILLS PROGRESS ---------------------- */
const skills = document.querySelector(".skills");
window.onscroll = function () {
  const skillsScroll = skills.offsetTop;
  const skillsOuter = skills.offsetHeight;
  const windowHeight = this.innerHeight;
  const top = this.scrollY;

  if (top > skillsScroll + skillsOuter - windowHeight) {
    document.querySelectorAll(".skill-box .prog span").forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
/* ---------------------- OUR SKILLS PROGRESS ---------------------- */

/* ---------------------- OUR GALLERY ---------------------- */
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const overlay = document.createElement("div");
    overlay.className = "popup_overlay";
    document.body.appendChild(overlay);

    const popup = document.createElement("div");
    popup.className = "popup";

    if (img.alt !== null) {
      const heading = document.createElement("h3");
      heading.innerHTML = img.alt;
      popup.appendChild(heading);
    }

    const imgPopup = document.createElement("img");
    imgPopup.src = img.src;
    popup.appendChild(imgPopup);
    document.body.appendChild(popup);

    const close = document.createElement("span");
    close.className = "close";
    close.innerHTML = "&times;";
    popup.appendChild(close);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className == "close") {
    document.querySelector(".popup").remove();
    document.querySelector(".popup_overlay").remove();
  }
});
/* ---------------------- OUR GALLERY ---------------------- */
/* ---------------------- MEDIA QUERY ---------------------- */
document
  .querySelector(".landing .header .fa-bars")
  .addEventListener("click", () => {
    document.querySelector(".landing .header .links").classList.toggle("open");
  });
/* ---------------------- CONTACT US ---------------------- */
