import { PropsWithChildren, useState, useEffect, useRef } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [tickerWidth, setTickerWidth] = useState<number | undefined>(undefined);
  const measureRef = useRef<HTMLSpanElement>(null);

  const measure = (text: string) => {
    if (measureRef.current) {
      measureRef.current.textContent = text;
      return measureRef.current.getBoundingClientRect().width;
    }
    return undefined;
  };

  useEffect(() => {
    const initW = measure(GREETINGS[0]);
    if (initW) setTickerWidth(initW);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = measure(GREETINGS[currentIndex]);
      if (w) setTickerWidth(w);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  useEffect(() => {
    let rollTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      const incoming = (currentIndex + 1) % GREETINGS.length;
      setNextIndex(incoming);

      const targetW = measure(GREETINGS[incoming]);
      if (targetW) {
        setTickerWidth(targetW);
      }

      setIsRolling(true);

      rollTimeout = setTimeout(() => {
        setCurrentIndex(incoming);
        setIsRolling(false);
      }, 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(rollTimeout);
    };
  }, [currentIndex]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          {/* Invisible sizing element using the exact same font settings */}
          <span ref={measureRef} className="greeting-measure" aria-hidden="true" />

          <div className="landing-intro">
            <div className="landing-intro-content">
              <h2>
                <span
                  className="greeting-ticker"
                  style={{ width: tickerWidth ? `${tickerWidth}px` : "auto" }}
                >
                  <span
                    className={`greeting-word ${isRolling ? "roll-out" : "active"}`}
                  >
                    {GREETINGS[currentIndex]}
                  </span>
                  {isRolling && (
                    <span className="greeting-word roll-in">
                      {GREETINGS[nextIndex]}
                    </span>
                  )}
                </span>
                <span className="landing-im"> I'm</span>
              </h2>
              <h1>YASH TYAGI</h1>
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
