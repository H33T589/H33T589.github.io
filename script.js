const fadeElems = document.querySelectorAll(".fade-in");

const handleScroll = () => {
  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.style.animationPlayState = "running";
    }
  });
};

window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
