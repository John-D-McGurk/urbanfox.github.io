function scaling() {
  const about_section = document.querySelector("#about");
  const title_section = document.querySelector("#title");
  const besideSidebarContent = document.querySelector('#beside-sidebar-content');
  const body = document.querySelector('body')
  const footer = document.querySelector('#footer')

  besideSidebarContent.style.cssText = `padding-top: ${title_section.offsetHeight}px; height: ${about_section.offsetHeight}px`;
  sidebar.style.height = `${
    about_section.offsetHeight + title_section.offsetHeight
  }px`;

  body.style.paddingBottom = `${footer.offsetHeight}px`

}

function sidebarContentFade(maskContainer, maskFadeDistance) {
    const maskFadeThreshold = 35;
  maskContainer.style.cssText = `-webkit-mask:  linear-gradient( to bottom,
    rgba(0, 0, 0 ,1) 0px,
    rgba(0, 0, 0 ,1) ${maskFadeDistance - maskFadeThreshold}px,
    rgba(0, 0, 0 , 0) ${maskFadeDistance}px);`;
}

function sidebarEffects(sidebar, bg) {
  const sidebarSocials = document.querySelector("#sidebar-socials");
  const maskContainer = document.querySelector("#mask-container");

  let distanceToBGLock = maskContainer.offsetHeight - window.innerHeight;
  let distanceTilMask = -1 * (window.scrollY + window.innerHeight - sidebarSocials.offsetHeight - maskContainer.offsetHeight);
  let maskFadeDistance = maskContainer.offsetHeight - distanceTilMask;



  if (window.scrollY >= distanceToBGLock) {
    sidebarSocials.style.cssText = `position: absolute; top: ${sidebar.offsetHeight - sidebarSocials.offsetHeight}px; width: ${sidebar.offsetWidth}`;
    
    bg.forEach(
      (element) =>
        (element.style.cssText = `position: absolute; top: ${distanceToBGLock}px;`)
    );

  } else {    
    sidebarSocials.style.cssText = "";
    bg.forEach((element) => (element.style.cssText = ""));

    if (distanceTilMask > -sidebarSocials.offsetHeight) {
      sidebarContentFade(maskContainer, maskFadeDistance);
    }

  }
}

function resizeScrollCorrections() {
  const bg = [
    document.querySelector("#bg-gradient"),
    document.querySelector("#bg-image"),
  ];
  const sidebar = document.querySelector("#sidebar");

  sidebarEffects(sidebar, bg);
  scaling();
}




window.onscroll = function () {
  resizeScrollCorrections();
};

window.onresize = function () {
  resizeScrollCorrections();
};
