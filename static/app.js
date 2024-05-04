function scaling() {
  const about_section = document.querySelector("#about");
  const title_section = document.querySelector("#title");
  const besideSidebarContent = document.querySelector(
    "#beside-sidebar-content"
  );
  const body = document.querySelector("body");
  const footer = document.querySelector("#footer");

  besideSidebarContent.style.cssText = `padding-top: ${title_section.offsetHeight}px; height: ${about_section.offsetHeight}px`;

  body.style.paddingBottom = `${footer.offsetHeight}px`;
}

function modalOpener() {
  const body = document.querySelector("body");
  const modalCards = document.querySelectorAll(".modal-card");
  const modalContainer = document.querySelector(".modal");
  const modalWindow = modalContainer.querySelector(".modal-inner");

  function closeModal() {
    modalContainer.classList.remove("active");
    body.style.overflow = "auto";
  }

  function openModal(modalCard) {
    const imageSrc = modalCard.dataset.image;
    const image = new Image();
    image.src = `static/images/high_res/${imageSrc}.jpg`;
    const button = document.createElement("button");
    button.innerHTML = '<img src="static/images/close-x.svg" alt="">';
    button.id = "modal-close";
    button.addEventListener("click", closeModal);

    modalContainer.classList.add("active");
    modalWindow.innerHTML = "";

    const modalContent = document.createElement("div");

    modalContent.appendChild(image);
    modalContent.appendChild(button);

    modalContent.classList.add("modal-content");

    modalWindow.appendChild(modalContent);
    body.style.overflow = "hidden";
  }

  modalContainer.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-inner")) {
      closeModal();
    }
  });

  modalCards.forEach((modalCard) => {
    modalCard.addEventListener("click", () => {
      openModal(modalCard);
    });
  });
}

function revealOnLoad() {
  const loadReveal = document.querySelectorAll(".load-reveal");
  loadReveal.forEach((element) => element.classList.add("active"));
}

function revealOnScroll() {
  const scrollReveal = document.querySelectorAll(".reveal");
  scrollReveal.forEach((element) => {
    var top = element.getBoundingClientRect().top;

    if (window.innerHeight >= top + window.innerHeight / 3) {
      element.classList.add("active");
    }
  });
}

function logoShrink() {
  const logo = document.querySelector("#logo");
  paths = logo.querySelectorAll("path");

  if (window.scrollY > 0) {
    logo.style.cssText =
      "top: 0%; left: 0%; height: 6rem; width: 6rem; transform: translate(1rem, 1rem);";
    paths.forEach((path) => {
      path.style.fill = "#d9d9d9";
    });
  } else {
    paths.forEach((path) => {
      path.style.fill = "";
    });
    logo.style.cssText = "";
  }
}

function contentFade(maskContainer, maskFadeDistance) {
  const maskFadeThreshold = 20;

  maskContainer.style.cssText = `-webkit-mask:  linear-gradient( to bottom,
    rgba(0, 0, 0 ,1) 0px,
    rgba(0, 0, 0 ,1) ${maskFadeDistance - maskFadeThreshold}px,
    rgba(0, 0, 0 , 0) ${maskFadeDistance}px);`;
}

function parallaxScroll() {
  const parallaxImg = document.querySelector(".parallax-object");
  const parallaxContainer = document.querySelector(".parallax");

  const carouselBtns = document.querySelectorAll(".carousel-btn");

  scrollAmount =
    parallaxContainer.getBoundingClientRect().top -
    (window.innerHeight - parallaxContainer.offsetHeight) / 2;

  parallaxImg.style.top = `${
    parallaxContainer.offsetHeight / 2 -
    parallaxImg.offsetHeight / 2 -
    scrollAmount / 4
  }px`;
}

function sidebarEffects(sidebar, bg) {
  const sidebarSocials = document.querySelector("#sidebar-socials");
  const maskContainer = document.querySelector("#mask-container");
  const sidebarBG = document.querySelector("#sidebar-bg");

  let distanceToBGLock = maskContainer.offsetHeight - window.innerHeight;
  let distanceTilMask =
    -1 *
    (window.scrollY +
      window.innerHeight -
      sidebarSocials.offsetHeight -
      maskContainer.offsetHeight);
  let maskFadeDistance = maskContainer.offsetHeight - distanceTilMask;

  sidebarBG.style.height = `${Math.ceil(maskContainer.offsetHeight) + 1}px`;

  if (window.scrollY >= distanceToBGLock) {
    sidebarSocials.style.cssText = `position: absolute; top: ${
      sidebarBG.offsetHeight - sidebarSocials.clientHeight
    }px; width: ${sidebar.offsetWidth}`;

    bg.forEach(
      (element) =>
        (element.style.cssText = `position: absolute; top: ${distanceToBGLock}px;`)
    );
  } else {
    contentFade(maskContainer, maskFadeDistance);
    sidebarSocials.style.cssText = "";
    bg.forEach((element) => (element.style.cssText = ""));
  }
}

function carousel() {
  const slides = document.querySelectorAll(".carousel-object");

  slides.forEach(
    (slide, idx) => (slide.style.transform = `translate(${idx * 100}vw)`)
  );

  let currentSlide = 0;
  let maxSlide = slides.length - 1;
  const nextSlide = document.querySelector(".btn-next");
  const prevSlide = document.querySelector(".btn-prev");

  nextSlide.addEventListener("click", () => {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    slides.forEach((slide, idx) => {
      slide.style.transform = `translateX(${100 * (idx - currentSlide)}%)`;
    });
  });

  prevSlide.addEventListener("click", () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    slides.forEach((slide, idx) => {
      slide.style.transform = `translateX(${100 * (idx - currentSlide)}%)`;
    });
  });
}

function resizeScrollCorrections() {
  const bg = [
    document.querySelector("#bg-gradient"),
    document.querySelector("#bg-image"),
  ];
  const sidebar = document.querySelector("#sidebar");

  logoShrink();
  sidebarEffects(sidebar, bg);
  scaling();
  parallaxScroll();
  revealOnScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  resizeScrollCorrections();
  revealOnLoad();
  carousel();
  modalOpener();

  if (window.scrollY > 0) {
    document.querySelector("#logo").style.transition = "0s";
  }
});

window.onscroll = function () {
  resizeScrollCorrections();
};

window.onresize = function () {
  resizeScrollCorrections();
};
