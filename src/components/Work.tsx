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
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
          <a
            href="https://github.com/Yashtyagi2406?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="more-projects-btn"
            data-cursor="disable"
          >
            <span>More Projects</span>
            <span className="btn-arrow">↗</span>
          </a>
        </div>
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
              <div className="work-actions">
                <a
                  href="https://volunteer-compass-tawny.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn live-btn"
                  data-cursor="disable"
                >
                  <span className="live-dot"></span> Live Demo ↗
                </a>
                <a
                  href="https://github.com/Yashtyagi2406/volunteer-compass"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <WorkImage
              image="/images/volunteer_compass.png"
              alt="VolunteerCompass Live Platform"
              link="https://volunteer-compass-tawny.vercel.app"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/synced-home-experience" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      Sync Home
                    </a>
                  </h4>
                  <p>Hybrid IoT Home Automation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, TypeScript, Vite, Three.js (R3F), GSAP, MQTT, TanStack Query, Tailwind CSS, Recharts, Vitest, Playwright</p>
              <div className="work-actions">
                <a
                  href="https://69db5b6048cd0da8b256a86b--sync-home.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn live-btn"
                  data-cursor="disable"
                >
                  <span className="live-dot"></span> Live Demo ↗
                </a>
                <a
                  href="https://github.com/Yashtyagi2406/synced-home-experience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <WorkImage
              image="/images/sync_home.png"
              alt="Sync Home 3D IoT Visualization"
              link="https://69db5b6048cd0da8b256a86b--sync-home.netlify.app/"
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
              <div className="work-actions">
                <a
                  href="https://github.com/Yashtyagi2406/AI-GCM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
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
              <div className="work-actions">
                <a
                  href="https://instant-mechanic-dashboard-indol.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn live-btn"
                  data-cursor="disable"
                >
                  <span className="live-dot"></span> Live Demo ↗
                </a>
                <a
                  href="https://github.com/Yashtyagi2406/instant-mechanic-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <WorkImage
              image="/images/instant_mechanic.png"
              alt="Instant Mechanic Operations Dashboard"
              link="https://instant-mechanic-dashboard-indol.vercel.app"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/lld-practice-platform" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      LLD Practice Platform
                    </a>
                  </h4>
                  <p>System Design Evaluation</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>React, TypeScript, Vite, Tailwind CSS, Fastify / Node.js, AI Rubric Feedback, Monorepo</p>
              <div className="work-actions">
                <a
                  href="https://github.com/Yashtyagi2406/lld-practice-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <WorkImage
              image="/images/lld_platform.png"
              alt="LLD Practice Platform"
              link="https://github.com/Yashtyagi2406/lld-practice-platform"
            />
          </div>
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>06</h3>
                <div>
                  <h4>
                    <a href="https://github.com/Yashtyagi2406/fault-tolerant-pipeline" target="_blank" rel="noopener noreferrer" className="work-title-link">
                      Fault-Tolerant Pipeline
                    </a>
                  </h4>
                  <p>Data Ingestion & Recovery</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>Node.js, Express, Content-Based Idempotency Keys, Write Failure Recovery, Event Normalization, Aggregation API</p>
              <div className="work-actions">
                <a
                  href="https://github.com/Yashtyagi2406/fault-tolerant-pipeline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-action-btn github-btn"
                  data-cursor="disable"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
            <WorkImage
              image="/images/fault_tolerant_pipeline.png"
              alt="Fault Tolerant Ingestion Pipeline"
              link="https://github.com/Yashtyagi2406/fault-tolerant-pipeline"
            />
          </div>
          <div className="work-box work-box-more">
            <a
              href="https://github.com/Yashtyagi2406?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="more-projects-card"
              data-cursor="disable"
            >
              <div className="more-projects-badge">
                <svg className="more-github-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="more-projects-title">More Projects</div>
              <p className="more-projects-sub">
                Explore 30+ open source repositories, experiments, microservices & CLI tools on my GitHub.
              </p>
              <div className="more-projects-action">
                <span>View on GitHub</span>
                <span className="action-arrow">↗</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
