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
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/volunteer-compass" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      VolunteerCompass
                    </a>
                  </h4>
                  <p>Full-Stack Platform</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React 18, TypeScript, Node.js, Express, PostgreSQL, Prisma, Socket.io, Redis, Bull, JWT, Zod, Vercel, Render</p>
            </div>
            <WorkImage
              image="/images/volunteer_compass.png"
              alt="VolunteerCompass Live Platform"
              link="https://github.com/Yashtyagi2406/volunteer-compass"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      Sync Home
                    </a>
                  </h4>
                  <p>Hybrid IoT Home Automation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, TypeScript, Vite, Three.js (R3F), GSAP, MQTT, TanStack Query, Tailwind CSS, Recharts, Vitest, Playwright</p>
            </div>
            <WorkImage
              image="/images/sync_home.png"
              alt="Sync Home 3D IoT Visualization"
              link="https://github.com/Yashtyagi2406"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/AI-GCM" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      AI Governance Platform
                    </a>
                  </h4>
                  <p>SaaS / Enterprise</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js 14, TypeScript, Go, Python, PostgreSQL, ClickHouse, Kafka, Redis, Docker, Kubernetes, OPA (Rego), FastAPI, Terraform, AWS EKS</p>
            </div>
            <WorkImage
              image="/images/ai_governance.png"
              alt="AI Governance & Cost Management Platform"
              link="https://github.com/Yashtyagi2406/AI-GCM"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/instant-mechanic-dashboard" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      Instant Mechanic
                    </a>
                  </h4>
                  <p>Real-Time Operations Dashboard</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Next.js, Express, PostgreSQL, Socket.io, Tailwind CSS, Recharts, TypeScript, REST APIs</p>
            </div>
            <WorkImage
              image="/images/instant_mechanic.png"
              alt="Instant Mechanic Operations Dashboard"
              link="https://github.com/Yashtyagi2406/instant-mechanic-dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
