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

function logoShrink() {
const logo = document.querySelector('#logo');


    if (window.scrollY > 50) {
        logo.style.cssText = 'top: 0%; left: 0%; height: 6rem; transform: translate(1rem, 1rem);'
    } else {
        logo.style.cssText = ''
    }
};

function contentFade(maskContainer, maskFadeDistance) {
    const maskFadeThreshold = 20;


  maskContainer.style.cssText = `-webkit-mask:  linear-gradient( to bottom,
    rgba(0, 0, 0 ,1) 0px,
    rgba(0, 0, 0 ,1) ${maskFadeDistance - maskFadeThreshold}px,
    rgba(0, 0, 0 , 0) ${maskFadeDistance}px);`;
}

function sidebarEffects(sidebar, bg) {
  const sidebarSocials = document.querySelector("#sidebar-socials");
  const maskContainer = document.querySelector("#mask-container");
  const sidebarBG = document.querySelector('#sidebar-bg')

  let distanceToBGLock = maskContainer.offsetHeight - window.innerHeight;
  let distanceTilMask = -1 * (window.scrollY + window.innerHeight - sidebarSocials.offsetHeight - maskContainer.offsetHeight);
  let maskFadeDistance = maskContainer.offsetHeight - distanceTilMask;

  sidebarBG.style.height = `${maskContainer.offsetHeight}px`

  if (window.scrollY >= distanceToBGLock) {
    sidebarSocials.style.cssText = `position: absolute; top: ${sidebarBG.offsetHeight - sidebarSocials.clientHeight - 30}px; width: ${sidebar.offsetWidth}`;
    
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

function resizeScrollCorrections() {
  const bg = [
    document.querySelector("#bg-gradient"),
    document.querySelector("#bg-image"),
  ];
  const sidebar = document.querySelector("#sidebar");

  logoShrink();
  sidebarEffects(sidebar, bg);
  scaling();
}

document.addEventListener('DOMContentLoaded', () => {

    resizeScrollCorrections();
});


window.onscroll = function () {
  resizeScrollCorrections();
};

window.onresize = function () {
  resizeScrollCorrections();
};
