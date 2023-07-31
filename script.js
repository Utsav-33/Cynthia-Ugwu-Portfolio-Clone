var timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#hero-footer", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleSkew() {
  //define default value
  clearTimeout(timeout);
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", (dets) => {
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleFollowMouse(xscale, yscale);
    timeout = setTimeout(() => {
      document.querySelector(
        "#cursor-circle"
      ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
    // console.log(gsap.utils.clamp(.8,1.2,xdiff));
  });
}

function circleFollowMouse(xscale, yscale) {
  window.addEventListener("mousemove", (dets) => {
    document.querySelector(
      "#cursor-circle"
    ).style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
  });
}

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diffrence = 0;

  elem.addEventListener("mouseleave", (dets) => {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrence = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrence = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrence),
    });
  });
});

circleSkew();
circleFollowMouse();
firstPageAnim();
