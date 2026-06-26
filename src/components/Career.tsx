import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech — Computer Science & Engineering</h4>
                <h5>KCC Institute of Technology and Management, Greater Noida, UP</h5>
              </div>
              <h3>2023–2027</h3>
            </div>
            <p>
              CGPA: 7.7 / 10.0 · Relevant Coursework: DSA, Operating Systems, DBMS, Computer Networks, Software Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Top 5 — Hackaccino 4.0</h4>
                <h5>Bennett University · National Hackathon (2,936 teams) · ₹15L+ prize pool</h5>
              </div>
              <h3>Feb 2026</h3>
            </div>
            <p>
              Ranked in the top 5 out of 2,936 teams at Bennett University's 24-hour national hackathon with a ₹15L+ prize pool.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Top 5 — Mind Installers Hackathon 4.0</h4>
                <h5>IIMT College of Engineering, Greater Noida</h5>
              </div>
              <h3>Apr 2026</h3>
            </div>
            <p>
              Ranked in the top 5 at IIMT College of Engineering's 30-hour hackathon. Also competed in HackIndia Spark 4 at the national level, and captained KCC Institute's cricket team to a championship victory in 2023–24.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
