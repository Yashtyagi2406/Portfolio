import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>VolunteerCompass</h4>
                  <p>Full-Stack Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React 18, TypeScript, Node.js, Express, PostgreSQL, Prisma, Socket.io, Redis, Bull, JWT, Zod, Vercel, Render</p>
            </div>
            <WorkImage
              image="/images/react.webp"
              alt="VolunteerCompass"
              link="https://github.com/Yashtyagi2406"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>Sync Home</h4>
                  <p>Hybrid IoT Home Automation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, TypeScript, Vite, Three.js (R3F), GSAP, MQTT, TanStack Query, Tailwind CSS, Recharts, Vitest, Playwright</p>
            </div>
            <WorkImage
              image="/images/next.webp"
              alt="Sync Home IoT Dashboard"
              link="https://github.com/Yashtyagi2406"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>AI Governance Platform</h4>
                  <p>SaaS / Enterprise</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js 14, TypeScript, Go, Python, PostgreSQL, ClickHouse, Kafka, Redis, Docker, Kubernetes, OPA (Rego), FastAPI, Terraform, AWS EKS</p>
            </div>
            <WorkImage
              image="/images/node.webp"
              alt="AI Governance & Cost Management Platform"
              link="https://github.com/Yashtyagi2406"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
