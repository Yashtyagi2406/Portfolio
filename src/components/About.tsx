import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-glow"></div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <div className="para about-content-wrapper">
          <div className="about-accent-line"></div>
          <div>
            <p className="about-lead">
              Full-Stack Engineer specializing in Real-Time Systems & IoT.
            </p>
            <p className="about-sub">
              I'm a Computer Science student at KCC Institute of Technology (2023–2027), building production-grade systems at the intersection of design and engineering. From real-time volunteer platforms powered by Socket.io & Bull/Redis, to immersive IoT dashboards with Three.js and MQTT, to multi-tenant AI governance SaaS on Kubernetes — I ship end-to-end, high-performance web systems that scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
