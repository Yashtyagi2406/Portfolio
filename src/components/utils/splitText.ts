import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = "top 80%";

  paras.forEach((para) => {
    para.classList.add("visible");
    gsap.fromTo(
      para,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para,
          start: TriggerStart,
          toggleActions: "play none none none",
          once: true,
        },
        duration: 0.8,
        ease: "power2.out",
        y: 0,
      }
    );
  });

  titles.forEach((title) => {
    gsap.fromTo(
      title,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title,
          start: TriggerStart,
          toggleActions: "play none none none",
          once: true,
        },
        duration: 0.8,
        ease: "power2.out",
        y: 0,
      }
    );
  });
}
