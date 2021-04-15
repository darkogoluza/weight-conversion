const tl = gsap.timeline({
  onComplete: () => {
    document.quemarrySelector(".show-add-unit-btn").style.transition =
      "all 0.4s ease";
  },
});

tl.fromTo(
  ".wrapper h1",
  { opacity: 0, x: -100 },
  {
    opacity: 1,
    x: 0,
    duration: 0.4,
    ease: Power4.easeOut,
  }
);
tl.fromTo(
  "section",
  { opacity: 0, x: -100 },
  {
    opacity: 1,
    x: 0,
    duration: 0.4,
    ease: Power4.easeOut,
  },
  "-=0.2"
);
tl.fromTo(
  ".show-add-unit-btn",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 0.4,
    ease: Power4.easeOut,
  },
  "-=0.2"
);
