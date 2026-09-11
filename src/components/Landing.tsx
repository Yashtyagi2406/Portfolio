import { PropsWithChildren, useState, useEffect } from "react";
import "./styles/Landing.css";

const GREETINGS = [
  "Hello!",
  "Namaste!",
  "Bonjour!",
  "¡Hola!",
  "Konnichiwa!",
  "Ciao!",
  "Olá!",
  "Guten Tag!",
];

const Landing = ({ children }: PropsWithChildren) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setIsFading(true);
      fadeTimeout = setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        setIsFading(false);
      }, 250);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <div className="landing-intro-content">
              <h2>
                <span className={`landing-greeting ${isFading ? "fading" : ""}`}>
                  {GREETINGS[greetingIndex]}
                </span>{" "}
                I'm
              </h2>
              <h1>
                YASH
                <br />
                <span>TYAGI</span>
              </h1>
            </div>
          </div>
          <div className="landing-info">
            <div className="landing-info-hover">
              <h3>Full Stack</h3>
              <h2 className="landing-info-h2">Developer Engineer</h2>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
